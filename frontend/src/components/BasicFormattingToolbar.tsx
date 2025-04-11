import {
    Code,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatColorText,
    FormatItalic,
    FormatListBulleted,
    FormatListNumbered,
    FormatQuote,
    FormatUnderlined,
    Highlight
} from '@mui/icons-material';
import {
    Box,
    ButtonGroup,
    Divider,
    IconButton,
    Tooltip
} from '@mui/material';
import { Editor } from '@tiptap/react';
import React from 'react';

interface BasicFormattingToolbarProps {
  editor: Editor | null;
  textColor: string;
  bgColor: string;
}

const BasicFormattingToolbar: React.FC<BasicFormattingToolbarProps> = ({ 
  editor, 
  textColor, 
  bgColor 
}) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      className="formatting-toolbar"
      sx={{
        backgroundColor: textColor,
        color: bgColor,
      }}
    >
      <ButtonGroup variant="text" size="small">
        <Tooltip title="Bold">
          <IconButton 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            color={editor.isActive('bold') ? "primary" : "default"}
            sx={{ color: editor.isActive('bold') ? '#3e7aff' : bgColor }}
          >
            <FormatBold />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Italic">
          <IconButton 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            color={editor.isActive('italic') ? "primary" : "default"}
            sx={{ color: editor.isActive('italic') ? '#3e7aff' : bgColor }}
          >
            <FormatItalic />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Underline">
          <IconButton 
            onClick={() => editor.chain().focus().toggleUnderline().run()} 
            color={editor.isActive('underline') ? "primary" : "default"}
            sx={{ color: editor.isActive('underline') ? '#3e7aff' : bgColor }}
          >
            <FormatUnderlined />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: bgColor, opacity: 0.3 }} />
        
        <Tooltip title="Bullet List">
          <IconButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            color={editor.isActive('bulletList') ? "primary" : "default"}
            sx={{ color: editor.isActive('bulletList') ? '#3e7aff' : bgColor }}
          >
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Numbered List">
          <IconButton 
            onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            color={editor.isActive('orderedList') ? "primary" : "default"}
            sx={{ color: editor.isActive('orderedList') ? '#3e7aff' : bgColor }}
          >
            <FormatListNumbered />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: bgColor, opacity: 0.3 }} />
        
        <Tooltip title="Align Left">
          <IconButton 
            onClick={() => editor.chain().focus().setTextAlign('left').run()} 
            color={editor.isActive({ textAlign: 'left' }) ? "primary" : "default"}
            sx={{ color: editor.isActive({ textAlign: 'left' }) ? '#3e7aff' : bgColor }}
          >
            <FormatAlignLeft />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Align Center">
          <IconButton 
            onClick={() => editor.chain().focus().setTextAlign('center').run()} 
            color={editor.isActive({ textAlign: 'center' }) ? "primary" : "default"}
            sx={{ color: editor.isActive({ textAlign: 'center' }) ? '#3e7aff' : bgColor }}
          >
            <FormatAlignCenter />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Align Right">
          <IconButton 
            onClick={() => editor.chain().focus().setTextAlign('right').run()} 
            color={editor.isActive({ textAlign: 'right' }) ? "primary" : "default"}
            sx={{ color: editor.isActive({ textAlign: 'right' }) ? '#3e7aff' : bgColor }}
          >
            <FormatAlignRight />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, backgroundColor: bgColor, opacity: 0.3 }} />
        
        <Tooltip title="Block Quote">
          <IconButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()} 
            color={editor.isActive('blockquote') ? "primary" : "default"}
            sx={{ color: editor.isActive('blockquote') ? '#3e7aff' : bgColor }}
          >
            <FormatQuote />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Code">
          <IconButton 
            onClick={() => editor.chain().focus().toggleCode().run()} 
            color={editor.isActive('code') ? "primary" : "default"}
            sx={{ color: editor.isActive('code') ? '#3e7aff' : bgColor }}
          >
            <Code />
          </IconButton>
        </Tooltip>

        <Tooltip title="Text Color">
          <IconButton 
            onClick={() => editor.chain().focus().setColor('#3e7aff').run()} 
            sx={{ color: bgColor }}
          >
            <FormatColorText />
          </IconButton>
        </Tooltip>

        <Tooltip title="Highlight">
          <IconButton 
            onClick={() => editor.chain().focus().toggleHighlight().run()} 
            color={editor.isActive('highlight') ? "primary" : "default"}
            sx={{ color: editor.isActive('highlight') ? '#3e7aff' : bgColor }}
          >
            <Highlight />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
};

export default BasicFormattingToolbar;