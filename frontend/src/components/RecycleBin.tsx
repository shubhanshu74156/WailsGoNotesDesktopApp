import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  AppBar,
  Box,
  Card,
  Container,
  IconButton,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import { Note } from "../types";
import {
  formatDate,
  getNoteBackgroundColor,
  getNoteTextColor,
} from "../utils/noteUtils";

// Create a styled component for grid items if needed
const NoteCard = styled(Card)(({ theme }) => ({
  height: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  padding: theme.spacing(1, 2),
  opacity: 0.8,
}));

interface RecycleBinProps {
  deletedNotes: Note[];
  onRestoreNote: (id: string) => void;
  onDeletePermanently: (id: string) => void;
  onBack: () => void;
}

const RecycleBin: React.FC<RecycleBinProps> = ({
  deletedNotes,
  onRestoreNote,
  onDeletePermanently,
  onBack,
}) => {
  return (
    <Box
      sx={{
        height: "100vh",
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
          <IconButton
            edge="start"
            color="primary"
            sx={{ mr: 2 }}
            onClick={onBack}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "text.primary" }}
          >
            Recycle Bin
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            {deletedNotes.length} deleted notes
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Deleted Notes Grid */}
      <Container sx={{ flexGrow: 1, py: 2 }}>
        {deletedNotes.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Recycle bin is empty
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
            {deletedNotes.map((note) => (
              <NoteCard
                key={note.id}
                sx={{
                  bgcolor: getNoteBackgroundColor(note.color || "black"),
                  color: getNoteTextColor(note.color || "black"),
                  width: { xs: "100%", sm: "48%", md: "31%", lg: "23%" }, // Responsive
                  minWidth: "200px",
                }}
              >
                {/* Restore Button */}
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 40,
                    color: "#4caf50",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  onClick={() => onRestoreNote(note.id)}
                >
                  <RestoreIcon fontSize="medium" />
                </IconButton>

                {/* Delete Forever Button */}
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
                  onClick={() => onDeletePermanently(note.id)}
                >
                  <DeleteForeverIcon fontSize="medium" />
                </IconButton>

                {/* Title */}
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
                      color: getNoteTextColor(note.color || "black"),
                      wordWrap: "break-word",
                    }}
                  >
                    {note.title || "Untitled"}
                  </Typography>
                </Box>

                {/* Date */}
                <Typography
                  variant="caption"
                  sx={{
                    color:
                      getNoteTextColor(note.color || "black") === "#ffffff"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {formatDate(note.updatedAt)}
                </Typography>
              </NoteCard>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RecycleBin;
