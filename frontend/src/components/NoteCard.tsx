import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, IconButton, Typography } from "@mui/material";
import React from "react";
import { Note } from "../types";
import {
  formatDate,
  getNoteBackgroundColor,
  getNoteTextColor,
} from "../utils/noteUtils";

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
  const bgColor = getNoteBackgroundColor(note.color || "black");
  const textColor = getNoteTextColor(note.color || "black");

  return (
    <Card
      sx={{
        height: "200px",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.2s",
        bgcolor: bgColor,
        color: textColor,
        px: 2,
        py: 1,
        "&:hover": {
          transform: "translateY(-4px)",
          border: "1px solid white",
        },
      }}
      onClick={() => onEdit(note)}
    >
      {/* Delete Button */}
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          color: "#f44336",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
      >
        <DeleteIcon fontSize="medium" />
      </IconButton>

      {/* Centered Title */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
          px: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: textColor,
            wordWrap: "break-word",
          }}
        >
          {note.title || "Untitled"}
        </Typography>
      </Box>

      {/* Bottom Date */}
      <Typography
        variant="caption"
        sx={{
          color:
            textColor === "#ffffff"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 0, 0, 0.5)",
        }}
      >
        {formatDate()}
      </Typography>
    </Card>
  );
};

export default NoteCard;
