export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

// Define note colors
export interface NoteColorScheme {
  bg: string;
  text: string;
}

export interface NoteColors {
  [key: string]: NoteColorScheme;
}
