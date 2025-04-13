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

// Get the background color for a note
export const getNoteBackgroundColor = (color: string): string => {
  if (color && noteColors[color]) {
    return noteColors[color].bg;
  }
  return noteColors.black.bg; // Default fallback
};

// Get the text color for a note
export const getNoteTextColor = (color: string): string => {
  if (color && noteColors[color]) {
    return noteColors[color].text;
  }
  return noteColors.black.text; // Default fallback
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Just now";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

export const textColors = [
  "#3e7aff",
  "#f44336",
  "#4caf50",
  "#ff9800",
  "#000000",
  "#ffffff",
];
