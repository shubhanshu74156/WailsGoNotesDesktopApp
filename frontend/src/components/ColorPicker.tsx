import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup
} from '@mui/material';
import React, { useState } from 'react';
import { Note } from '../types';
import { noteColors } from '../utils/noteUtils';

interface ColorMenuPickerProps {
  currentNote: Note | null;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textColor: string;
}

const ColorMenuPicker: React.FC<ColorMenuPickerProps> = ({ 
  currentNote, 
  onColorChange,
  textColor
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        color="primary" 
        onClick={handleClick} 
        sx={{ color: textColor }}
      >
        <ColorLensIcon />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        id="color-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(219, 204, 204, 0))',
              background: "rgb(85, 78, 78)",
              mt: 1.5,
              padding: 2,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing on RadioGroup clicks
      >
        <MenuItem 
          sx={{ 
            padding: 1, 
            '&:hover': { 
              backgroundColor: 'transparent' 
            } 
          }}
          disableRipple
        >
          <RadioGroup
            row
            value={currentNote?.color || 'black'}
            onChange={(e) => {
              onColorChange(e);
              handleClose();
            }}
            sx={{ 
              display: 'grid',  
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 1,
            }}
          >
            {Object.entries(noteColors).map(([colorName, colorValues]) => (
              <Radio
                key={colorName}
                value={colorName}
                sx={{
                  color: colorValues.bg,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  '&.Mui-checked': {
                    color: colorValues.bg,
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.1)',
                  },
                  padding: 0.5,
                  margin: 0.5,
                  border: currentNote?.color === colorName ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'transform 0.2s ease'
                }}
                checkedIcon={
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: colorValues.bg,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                      }
                    }}
                  />
                }
                icon={
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: colorValues.bg
                    }}
                  />
                }
              />
            ))}
          </RadioGroup>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ColorMenuPicker;