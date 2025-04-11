import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DeleteNote, GetNotes, SaveNote } from '../wailsjs/go/main/App';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import darkTheme from './styles/theme';
import { Note } from './types';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    GetNotes().then(noteData => {
      console.log("Notes received:", noteData);
      setNotes(noteData || []);
    }).catch(err => {
      console.error("Error fetching notes:", err);
    });
  };

  const handleCreateNew = () => {
    setCurrentNote({ id: '', title: '', content: '', color: 'black' });
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note.color ? note : { ...note, color: 'black' });
    setIsEditing(true);
  };

  const handleUpdateNote = (note: Note) => {
    setCurrentNote(note);
  };

  const handleSave = () => {
    if (!currentNote) return;
    
    const noteToSave = { 
      ...currentNote, 
      id: currentNote.id || uuidv4(),
      color: currentNote.color || "black"
    };
    
    SaveNote(noteToSave).then(() => {
      setIsEditing(false);
      setCurrentNote(null);
      loadNotes();
    }).catch(err => {
      console.error("Error saving note:", err);
    });
  };

  const handleDelete = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    DeleteNote(id).then(() => {
      loadNotes();
      setIsEditing(false);
      setCurrentNote(null);
    }).catch(err => {
      console.error("Error deleting note:", err);
    });
  };

  const handleBack = () => {
    setIsEditing(false);
    handleSave();
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
      ) : (
        <NotesList
          notes={notes}
          onCreateNew={handleCreateNew}
          onEditNote={handleEditNote}
          onDeleteNote={handleDelete}
        />
      )}
    </ThemeProvider>
  );
};

export default App;