import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  SpeedDialIcon,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import TextField from "@mui/material/TextField";
import { debounce } from "lodash";
import React, { useMemo, useState } from "react";
import { Note } from "../types";
import NoteCard from "./NoteCard";

interface NotesListProps {
  notes: Note[];
  onCreateNew: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  onOpenRecycleBin: () => void;
  onSearch: (search: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes = [],
  onCreateNew,
  onEditNote,
  onDeleteNote,
  onOpenRecycleBin,
  onSearch,
}) => {
  const [searchText, setSearchTest] = useState("");
  const [listNotes, setListNotes] = useState<Note[]>(notes);
  const debouncedSearch = useMemo(
    () => debounce((value: string) => onSearch(value), 300),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTest(value);
    debouncedSearch(value);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Top AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.default",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          my: 1,
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="primary" sx={{ mr: 2 }}>
            <DescriptionIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          >
            All Notes
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            component="form"
            sx={{
              "& > :not(style)": {
                width: "25ch",
                mr: 2,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: {
                  height: 36, // Small height
                  borderRadius: "999px", // Circular border
                  paddingRight: 0,
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "999px", // Circular border
                  height: 36, // Control height
                  fontSize: "0.875rem",
                },
              }}
              onChange={handleSearchChange}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {notes.length} notes
          </Typography>
          <Tooltip title="Recycle Bin">
            <IconButton color="primary" onClick={onOpenRecycleBin}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
          {/* <IconButton color="primary">
            <MoreVertIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>

      {/* Notes Grid */}
      <Container sx={{ flexGrow: 1, p: 2 }}>
        {!notes || notes.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {searchText
                ? "No notes found matching your search"
                : "No notes yet. Create your first note!"}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={onEditNote}
                onDelete={onDeleteNote}
              />
            ))}
          </Box>
        )}
      </Container>

      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "sticky",
          bottom: 0,
          right: 0,
        }}
      >
        <SpeedDial
          ariaLabel="Create new note"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClick={onCreateNew}
        ></SpeedDial>
      </Box>
    </Box>
  );
};

export default NotesList;
