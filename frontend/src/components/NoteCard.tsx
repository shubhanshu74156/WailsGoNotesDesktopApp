import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Card, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Note } from '../types';
import { formatDate, getNoteBackgroundColor, getNoteTextColor, truncateContent } from '../utils/noteUtils';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const bgColor = getNoteBackgroundColor(note.color || 'black');
  const textColor = getNoteTextColor(note.color || 'black');
  
  return (
    <Card 
      sx={{ 
        height: '200px',
        width: '200px', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s',
        bgcolor: bgColor,
        color: textColor,
        '&:hover': {
          transform: 'translateY(-4px)',
          border: '1px solid white',
        }
      }}
      onClick={() => onEdit(note)}
    >
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <IconButton 
    size="small"
    sx={{ 
        p: 2,
        position: 'absolute',
      top: 0,
      right: 0,
      ml: 1,
      color: '#f44336', // red color for delete
      '&:hover': {
        opacity: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
      },
    }}
    onClick={(e) => {
      e.stopPropagation();
      onDelete(note.id);
    }}
  >
    <DeleteIcon fontSize="medium" />
  </IconButton>
        </Box>
        <Typography 
          variant="body2" 
          sx={{ 
            // flexGrow: 1, 
            color: textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            textOverflow: '-moz-initial',
            whiteSpace: 'wrap',
      overflow: 'hidden',
          }}
        >
          {truncateContent(note.content)}
        </Typography>
      </Box>
      <Box sx={{ 
        borderTop: '1px solid', 
        borderColor: bgColor ? '1px solid rgba(0, 0, 0, 0.1)': '1px solid rgba(255,255,255,0.1)',
        px: 2, 
        py: 1
      }}>
        <Typography variant="h6" sx={{ 
      fontWeight: 'bold', 
      color: textColor, 
      whiteSpace: 'wrap',
      overflow: 'hidden',
      textOverflow: '-moz-initial',
      maxWidth: '150px' // adjust width so delete button has room
    }}>
            {note.title || 'Untitled'}
          </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {formatDate()}
        </Typography>
      </Box>
    </Card>
  );
};

export default NoteCard;