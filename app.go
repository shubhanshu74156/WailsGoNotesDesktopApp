package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/chromedp/cdproto/page"
	"github.com/chromedp/chromedp"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Note struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Color   string `json:"color"`
}

// App struct
type App struct {
	ctx   context.Context
	notes []Note
}

// NewApp creates a new App application struct
func NewApp() *App {
	app := &App{}
	app.loadNotes()
	return app
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func getNotesFilePath() string {
	homeDir, _ := os.UserHomeDir()
	return filepath.Join(homeDir, ".wails-notes.json")
}

func (a *App) loadNotes() {
	a.notes = []Note{} // Initialize with empty array
	path := getNotesFilePath()
	data, err := os.ReadFile(path)
	if err == nil {
		json.Unmarshal(data, &a.notes)
	}
}

func (a *App) saveNotes() {
	data, _ := json.MarshalIndent(a.notes, "", "  ")
	_ = os.WriteFile(getNotesFilePath(), data, 0644)
}

func (a *App) GetNotes() []Note {
	return a.notes
}

func (a *App) SaveNote(note Note) {
	for i, n := range a.notes {
		if n.ID == note.ID {
			a.notes[i] = note
			a.saveNotes()
			return
		}
	}
	a.notes = append(a.notes, note)
	a.saveNotes()
}

func (a *App) DeleteNote(id string) {
	for i, n := range a.notes {
		if n.ID == id {
			a.notes = append(a.notes[:i], a.notes[i+1:]...)
			break
		}
	}
	a.saveNotes()
}

func (a *App) SearchNotes(query string) []Note {
	var result []Note
	query = strings.ToLower(query)
	for _, note := range a.notes {
		if strings.Contains(strings.ToLower(note.Title), query) || strings.Contains(strings.ToLower(note.Content), query) {
			result = append(result, note)
		}
	}
	return result
}

func (a *App) ConvertToPdf(id string) error {
	var selectedNote *Note
	for _, note := range a.notes {
		if note.ID == id {
			selectedNote = &note
			break
		}
	}
	if selectedNote == nil {
		return fmt.Errorf("note not found")
	}

	// Log the content for debugging
	// log.Printf("Note content: %s", selectedNote.Content)

	// Generate HTML with proper content rendering
	tpl := `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{{.Title}}</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                padding: 40px; 
                color: #333;
                background-color: {{.Color}}; 
            }
            h1 { 
                color: #333; 
                margin-bottom: 20px;
            }
            .content {
                font-size: 16px;
                line-height: 1.5;
            }
        </style>
    </head>
    <body>
        <h1>{{.Title}}</h1>
        <div class="content">{{.Content | unescapeHTML}}</div>
    </body>
    </html>
    `

	// Create a template with a custom function to unescape HTML
	tmpl := template.New("note")
	tmpl.Funcs(template.FuncMap{
		"unescapeHTML": func(s string) template.HTML {
			return template.HTML(s)
		},
	})

	tmpl, err := tmpl.Parse(tpl)
	if err != nil {
		log.Println("Template parsing error:", err)
		return err
	}

	var htmlBuf bytes.Buffer
	if err := tmpl.Execute(&htmlBuf, selectedNote); err != nil {
		log.Println("Template execution error:", err)
		return err
	}

	// Write the generated HTML to a temp file and log its location
	tempHTML := filepath.Join(os.TempDir(), "note_debug.html")
	if err := os.WriteFile(tempHTML, htmlBuf.Bytes(), 0644); err != nil {
		log.Println("HTML write error:", err)
		return err
	}
	// log.Printf("Debug HTML file saved at: %s\n", tempHTML)

	// ChromeDP options with longer timeout and viewport settings
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.Flag("headless", true),
		chromedp.Flag("disable-gpu", true),
		chromedp.Flag("no-sandbox", true),
		chromedp.WindowSize(1024, 768),
	)

	allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
	defer cancel()

	ctx, cancel := chromedp.NewContext(allocCtx)
	defer cancel()

	// Add a timeout
	ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	var pdfBuf []byte
	err = chromedp.Run(ctx,
		chromedp.Navigate("file://"+tempHTML),
		// Wait for content to be rendered
		chromedp.WaitVisible("body", chromedp.ByQuery),
		chromedp.Sleep(1*time.Second), // Give a bit more time for rendering
		chromedp.ActionFunc(func(ctx context.Context) error {
			var err error
			pdfBuf, _, err = page.PrintToPDF().
				WithPrintBackground(true).
				WithMarginTop(0.4).
				WithMarginBottom(0.4).
				WithMarginLeft(0.4).
				WithMarginRight(0.4).
				Do(ctx)
			return err
		}),
	)
	if err != nil {
		log.Println("PDF generation error:", err)
		return err
	}

	// Prepare filename for save dialog
	filename := selectedNote.Title
	if filename == "" {
		filename = "Untitled Note"
	}
	filename = filename + ".pdf"

	// Using Wails runtime for save dialog
	selectedFilePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		DefaultFilename: filename,
		Title:           "Save PDF",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "PDF Files (*.pdf)",
				Pattern:     "*.pdf",
			},
		},
	})

	if err != nil {
		log.Println("Dialog error:", err)
		return err
	}

	// User cancelled the dialog
	if selectedFilePath == "" {
		log.Println("File save cancelled by user")
		return nil
	}

	// Save the PDF to the user-selected location
	if err := os.WriteFile(selectedFilePath, pdfBuf, 0644); err != nil {
		log.Println("PDF write error:", err)
		return err
	}

	log.Printf("PDF saved at: %s\n", selectedFilePath)
	return nil
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
