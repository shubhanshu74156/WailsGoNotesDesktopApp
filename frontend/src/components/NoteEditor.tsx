import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, Container, Divider, IconButton, TextField, Toolbar } from '@mui/material';
import React from 'react';
import { Note } from '../types';
import { getNoteBackgroundColor, getNoteTextColor } from '../utils/noteUtils';
import ColorMenuPicker from './ColorPicker';

interface NoteEditorProps {
  currentNote: Note;
  onUpdateNote: (note: Note) => void;
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  currentNote, 
  onUpdateNote, 
  onBack 
}) => {
  const bgColor = getNoteBackgroundColor(currentNote?.color || 'black');
  const textColor = getNoteTextColor(currentNote?.color || 'black');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...currentNote, color: event.target.value });
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      bgcolor: bgColor,
      color: textColor 
    }}>
      {/* Top AppBar for editing */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: bgColor, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Toolbar>
          <IconButton edge="start" color="primary" onClick={onBack} sx={{ mr: 2, color: textColor }}>
            <ArrowBackIcon />
          </IconButton>
          <TextField
            variant="standard"
            placeholder="Title"
            value={currentNote?.title || ''}
            onChange={(e) => onUpdateNote({ ...currentNote, title: e.target.value })}
            fullWidth
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '24px', fontWeight: 'bold', color: textColor }
            }}
            sx={{ mb: 2 }}
          />
          
          {/* Color Menu Picker instead of the dialog button */}
          <ColorMenuPicker 
            currentNote={currentNote}
            onColorChange={handleColorChange}
            textColor={textColor}
          />
          
          <IconButton color="primary" sx={{ color: textColor }}>
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
        <Divider sx={{ my: 1, bgcolor: 'grey.700' }} />
      </AppBar>

      {/* Note Editor */}
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2 }}>
        <TextField
          variant="standard"
          placeholder="Start typing..."
          value={currentNote?.content || ''}
          onChange={(e) => onUpdateNote({ ...currentNote, content: e.target.value })}
          fullWidth
          multiline
          minRows={10}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: '16px', color: textColor === '#ffffff' ? '#ccc' : textColor }
          }}
          sx={{ flexGrow: 1 }}
        />
      </Container>
    </Box>
  );
};

export default NoteEditor;