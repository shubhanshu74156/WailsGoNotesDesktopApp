export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

// Define note colors
export interface NoteColorScheme {
  bg: string;
  text: string;
}

export interface NoteColors {
  [key: string]: NoteColorScheme;
}
