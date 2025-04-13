import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DeleteNote,
  GetDeletedNotes,
  GetNotes,
  RestoreNote,
  SaveNote,
  SoftDeleteNote,
} from "../wailsjs/go/main/App";
import NoteEditor from "./components/NoteEditor";
import NotesList from "./components/NotesList";
import RecycleBin from "./components/RecycleBin";
import darkTheme from "./styles/theme";
import { Note } from "./types";

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showRecycleBin, setShowRecycleBin] = useState(false);

  useEffect(() => {
    loadNotes();
    loadDeletedNotes();
  }, []);

  const loadNotes = () => {
    GetNotes()
      .then((noteData) => {
        console.log("Notes received:", noteData);
        setNotes(
          (noteData || []).map((note) => ({
            id: note.id,
            title: note.title,
            content: note.content,
            color: note.color || "black",
            date: note.date,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            deleted: note.deleted || false,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  };

  const loadDeletedNotes = () => {
    GetDeletedNotes()
      .then((noteData) => {
        console.log("Deleted notes received:", noteData);
        setDeletedNotes(
          (noteData || []).map((note) => ({
            id: note.id,
            title: note.title,
            content: note.content,
            color: note.color || "black",
            date: note.date,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
            deleted: true,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching deleted notes:", err);
      });
  };

  const handleCreateNew = () => {
    setCurrentNote({
      id: "",
      title: "",
      content: "",
      color: "black",
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deleted: false,
    });
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note.color ? note : { ...note, color: "black" });
    setIsEditing(true);
  };

  const handleUpdateNote = (note: Note) => {
    setCurrentNote(note);
  };

  const handleSave = () => {
    if (!currentNote) return;

    const isContentEmpty =
      (!currentNote.title.trim() && !currentNote.content.trim()) ||
      (currentNote.title === "" &&
        currentNote.content === '<p style="text-align: left"></p>');

    // Check if both title and content are empty
    if (isContentEmpty) {
      // Skip saving if note is empty, and simply exit the editor
      setIsEditing(false);
      setCurrentNote(null);
      return;
    }
    const now = new Date().toISOString();

    const noteToSave = {
      id: currentNote.id || uuidv4(),
      title: currentNote.title,
      content: currentNote.content,
      color: currentNote.color || "black",
      date: currentNote.date || now,
      createdAt: currentNote.createdAt || now,
      updatedAt: now,
      deleted: currentNote.deleted || false,
    };

    SaveNote(noteToSave)
      .then(() => {
        setIsEditing(false);
        setCurrentNote(null);
        loadNotes();
      })
      .catch((err) => {
        console.error("Error saving note:", err);
      });
  };

  const handleSoftDelete = (id: string) => {
    SoftDeleteNote(id)
      .then(() => {
        loadNotes();
        loadDeletedNotes();
      })
      .catch((err) => {
        console.error("Error soft deleting note:", err);
      });
  };

  const handlePermanentDelete = (id: string) => {
    DeleteNote(id)
      .then(() => {
        loadDeletedNotes();
      })
      .catch((err) => {
        console.error("Error permanently deleting note:", err);
      });
  };

  const handleRestoreNote = (id: string) => {
    RestoreNote(id)
      .then(() => {
        loadNotes();
        loadDeletedNotes();
      })
      .catch((err) => {
        console.error("Error restoring note:", err);
      });
  };

  const handleBack = () => {
    setIsEditing(false);
    handleSave();
  };

  const handleOpenRecycleBin = () => {
    setShowRecycleBin(true);
    loadDeletedNotes();
  };

  const handleCloseRecycleBin = () => {
    setShowRecycleBin(false);
  };

  // Main rendering logic
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {isEditing && currentNote ? (
        <NoteEditor
          currentNote={currentNote}
          onUpdateNote={handleUpdateNote}
          onBack={handleBack}
        />
      ) : showRecycleBin ? (
        <RecycleBin
          deletedNotes={deletedNotes}
          onRestoreNote={handleRestoreNote}
          onDeletePermanently={handlePermanentDelete}
          onBack={handleCloseRecycleBin}
        />
      ) : (
        <NotesList
          notes={notes}
          onCreateNew={handleCreateNew}
          onEditNote={handleEditNote}
          onDeleteNote={handleSoftDelete}
          onOpenRecycleBin={handleOpenRecycleBin}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
