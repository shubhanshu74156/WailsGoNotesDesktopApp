import { NoteColors } from "../types";

// Available note colors
export const noteColors: NoteColors = {
  linen: { bg: "#FAF0E6", text: "#2E2E2E" }, // warm beige-white
  peach: { bg: "#FFE0B2", text: "#2E2E2E" }, // soft peachy orange
  blush: { bg: "#F4D7D9", text: "#2E2E2E" }, // gentle pink
  sage: { bg: "#DDE5B6", text: "#2E2E2E" }, // pale green, warm toned
  sky: { bg: "#D6EAF8", text: "#2E2E2E" }, // light airy blue
  lilac: { bg: "#E6DAF1", text: "#2E2E2E" }, // soft purple
  butter: { bg: "#FFFACD", text: "#2E2E2E" }, // light yellow
  clay: { bg: "#E3CBB9", text: "#2E2E2E" }, // light brownish-tan
  black: { bg: "#121212", text: "#ffffff" },
};
// Function to truncate content for preview
export const truncateContent = (content: string, maxLength = 80) => {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + "...";
};

// Function to format date
export const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
};

// Get the background color for a note
export const getNoteBackgroundColor = (color: string) => {
  return (
    noteColors[color as keyof typeof noteColors]?.bg || noteColors.black.bg
  );
};

// Get the text color for a note
export const getNoteTextColor = (color: string) => {
  return (
    noteColors[color as keyof typeof noteColors]?.text || noteColors.black.text
  );
};
