import {
  FormatClear as ClearFormattingIcon,
  Code as CodeBlockIcon,
  Title as HeadingIcon,
  HorizontalRule as HorizontalRuleIcon,
  Image as ImageIcon,
  TableChart as TableIcon,
  FormatListNumbered as TaskListIcon
} from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField
} from '@mui/material';
import { Editor } from '@tiptap/react';
import React, { useState } from 'react';
import { tableHTML } from '../utils/TipTapExtensions';

interface AdvancedFeaturesDialProps {
  editor: Editor | null;
}

const AdvancedFeaturesDial: React.FC<AdvancedFeaturesDialProps> = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState<null | 'image' | 'heading'>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [headingLevel, setHeadingLevel] = useState<'1' | '2' | '3' | '4' | '5' | '6'>('1');

  if (!editor) {
    return null;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleImageDialogOpen = () => {
    setDialogType('image');
    setImageUrl('');
  };

  const handleHeadingDialogOpen = () => {
    setDialogType('heading');
    setHeadingLevel('1');
  };

  const handleDialogClose = () => {
    setDialogType(null);
  };

  const insertImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setDialogType(null);
    }
  };

  const insertHeading = () => {
    const level = parseInt(headingLevel);
    editor.chain().focus().toggleHeading({ level: parseInt(headingLevel) as any }).run();
    setDialogType(null);
  };

  const actions = [
    { 
      icon: <HeadingIcon />, 
      name: 'Heading', 
      action: handleHeadingDialogOpen 
    },
    { 
      icon: <TaskListIcon />, 
      name: 'Task List', 
      action: () => editor.chain().focus().toggleTaskList().run() 
    },
    { 
      icon: <TableIcon />, 
      name: 'Table', 
      action: () => editor.chain().focus().insertContent(tableHTML).run() 
    },
    { 
      icon: <ImageIcon />, 
      name: 'Image', 
      action: handleImageDialogOpen 
    },
    { 
      icon: <HorizontalRuleIcon />, 
      name: 'Horizontal Rule', 
      action: () => editor.chain().focus().setHorizontalRule().run() 
    },
    { 
      icon: <CodeBlockIcon />, 
      name: 'Code Block', 
      action: () => editor.chain().focus().toggleCodeBlock().run() 
    },
    { 
      icon: <ClearFormattingIcon />, 
      name: 'Clear Formatting', 
      action: () => editor.chain().focus().unsetAllMarks().clearNodes().run() 
    },
  ];

  return (
    <>
      <Box className="advanced-tools-fab">
        <SpeedDial
          ariaLabel="Advanced formatting options"
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              // tooltipTitle={action.name}
              // tooltipOpen
              onClick={() => {
                action.action();
                handleClose();
              }}
            />
          ))}
        </SpeedDial>
      </Box>

      {/* Image URL Dialog */}
      <Dialog open={dialogType === 'image'} onClose={handleDialogClose}>
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={insertImage}>Insert</Button>
        </DialogActions>
      </Dialog>

      {/* Heading Dialog */}
      <Dialog open={dialogType === 'heading'} onClose={handleDialogClose}>
        <DialogTitle>Insert Heading</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Heading Level"
            value={headingLevel}
            onChange={(e) => setHeadingLevel(e.target.value as '1' | '2' | '3' | '4' | '5' | '6')}
            SelectProps={{
              native: true,
            }}
            margin="dense"
            variant="outlined"
          >
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
            <option value="5">Heading 5</option>
            <option value="6">Heading 6</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={insertHeading}>Insert</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdvancedFeaturesDial;