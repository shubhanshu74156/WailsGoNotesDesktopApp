package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
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

// startup is called when the app starts. The context is saved
// so we can call the runtime methods

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
