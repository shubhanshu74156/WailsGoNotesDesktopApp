import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { ConvertToPdf } from "../../wailsjs/go/main/App";
import { Note } from "../types";
import { getNoteBackgroundColor, getNoteTextColor } from "../utils/noteUtils";
import ColorMenuPicker from "./ColorPicker";
import TipTapEditor from "./TipTapEditor";

interface NoteEditorProps {
  currentNote: Note;
  onUpdateNote: (note: Note) => void;
  onBack: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  currentNote,
  onUpdateNote,
  onBack,
}) => {
  // Get colors based on note's color setting
  const bgColor = getNoteBackgroundColor(currentNote?.color || "black");
  const textColor = getNoteTextColor(currentNote?.color || "black");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...currentNote, color: event.target.value });
  };

  const handleExportClick = () => {
    if (currentNote && currentNote.id) {
      handleExportPdf(currentNote.id);
    }
    handleMenuClose();
  };

  const handleContentUpdate = (content: string) => {
    onUpdateNote({ ...currentNote, content });
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleExportPdf = (id: string) => {
    if (id) {
      ConvertToPdf(id)
        .then(() => {
          console.log("PDF generated successfully.");
        })
        .catch((err) => {
          console.error("Error generating PDF:", err);
        });
    }
  };
  // Define approximate height for your AppBar
  const appBarHeight = 64; // in pixels

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: bgColor,
        color: textColor,
      }}
    >
      {/* Top AppBar for editing */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: bgColor,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 2,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            onClick={onBack}
            sx={{ mr: 2, color: textColor }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "left",
              alignItems: "center", // vertically centers the children
            }}
          >
            <TextField
              variant="standard"
              placeholder="Title"
              value={currentNote?.title || ""}
              onChange={(e) =>
                onUpdateNote({ ...currentNote, title: e.target.value })
              }
              sx={{
                width: "70%", // adjust width as needed
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: textColor,
                  textAlign: "left", // ensures the text inside is left aligned
                },
              }}
            />
          </Box>

          {/* Color Menu Picker */}
          <ColorMenuPicker
            currentNote={currentNote}
            onColorChange={handleColorChange}
            textColor={textColor}
          />
          {/* <IconButton
            color="primary"
            sx={{ color: textColor }}
            onClick={handleMenuOpen} // Add this line
          >
            <MoreVertIcon />
          </IconButton> */}
        </Toolbar>
        <Divider sx={{ my: 1, bgcolor: "grey.700" }} />
      </AppBar>

      {/* Editor Content Area with padding to account for fixed elements */}
      <Box
        sx={{
          flexGrow: 1,
          pt: `${appBarHeight + 16}px`, // add some extra spacing
          pb: "100px", // space for the bottom toolbar and advanced features
          overflow: "auto",
          px: 2, // Add horizontal padding
        }}
      >
        <TipTapEditor
          currentNote={currentNote}
          onUpdateContent={handleContentUpdate}
          textColor={textColor}
          bgColor={bgColor}
          onExportPdf={() => handleExportPdf(currentNote.id)}
        />
      </Box>
    </Box>
  );
};

export default NoteEditor;
