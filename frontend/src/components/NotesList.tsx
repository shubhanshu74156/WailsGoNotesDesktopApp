import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Container, IconButton, SpeedDialIcon, Toolbar, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SpeedDial from '@mui/material/SpeedDial';
import { alpha, styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { SearchNotes } from '../../wailsjs/go/main/App';
import { Note } from '../types';
import NoteCard from './NoteCard';

interface NotesListProps {
  notes: Note[];
  onCreateNew: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ 
  notes, 
  onCreateNew, 
  onEditNote, 
  onDeleteNote 
}) => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }))
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  useEffect(()=>{
    if (searchText.trim() === "") {
      setFilteredNotes(notes); // show all if empty
    } else {
      SearchNotes(searchText).then(setFilteredNotes);
    }
  },[searchText, notes])
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Top AppBar */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.default', borderBottom: '1px solid rgba(255,255,255,0.1)', my: 1 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'text.primary' }}>
            All Notes
          </Typography>
          <Search sx={{mr: 2}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase  
              placeholder="Search…"
              onChange={(e) => setSearchText(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {notes.length} notes
          </Typography>
          {/* <IconButton color="primary" onClick={onCreateNew}>
            <AddIcon />
          </IconButton> */}
          <IconButton color="primary">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Notes Grid */}
      <Container sx={{ flexGrow: 1, backgroundColor: 'black' }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: 2 
        }}>
          {filteredNotes.map((note) => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={onEditNote} 
              onDelete={onDeleteNote} 
            />
          ))}
        </Box>
      </Container>

      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: "sticky", bottom: 0, right:0 }}>
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
      onClick={onCreateNew}
    >
    </SpeedDial>
  </Box>
    </Box>
   
  );
};

export default NotesList;