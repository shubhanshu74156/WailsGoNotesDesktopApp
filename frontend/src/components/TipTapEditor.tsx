import { Box } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import React, { useEffect } from 'react';
import '../styles/TipTapEditor.css';
import { Note } from '../types';
import { getExtensions } from '../utils/TipTapExtensions';
import AdvancedFeaturesDial from './AdvancedFeaturesDial';
import BasicFormattingToolbar from './BasicFormattingToolbar';

interface TipTapEditorProps {
  currentNote: Note;
  onUpdateContent: (content: string) => void;
  textColor: string;
  bgColor: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({ 
  currentNote, 
  onUpdateContent,
  textColor,
  bgColor
}) => {
  // Initialize the Tiptap editor with desired extensions
  const editor = useEditor({
    extensions: getExtensions(),
    // Set initial content from currentNote
    content: currentNote?.content || '',
    onUpdate: ({ editor }) => {
      // Save the updated HTML
      onUpdateContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap',
        spellcheck: 'false',
      },
    },
  });

  // When the currentNote changes, update the editor content if needed
  useEffect(() => {
    if (editor && currentNote?.content !== editor.getHTML()) {
      editor.commands.setContent(currentNote?.content || '');
    }
  }, [currentNote, editor]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        color: textColor,
      }}
    >
      {/* Main editor content */}
      <EditorContent editor={editor} />
      
      {/* Basic formatting toolbar that appears at the bottom */}
      {editor && <BasicFormattingToolbar editor={editor} textColor={textColor} bgColor={bgColor} />}
      
      {/* Advanced features SpeedDial that appears at the bottom right */}
      {editor && <AdvancedFeaturesDial editor={editor} />}
    </Box>
  );
};

export default TipTapEditor;