import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface StopwatchProps {
  time: number;
  isRunning: boolean;
  setTime: (time: number) => void;
  setIsRunning: (running: boolean) => void;
  textColor?: string;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds
    .toString()
    .padStart(2, "0")}`;
};

const Stopwatch: React.FC<StopwatchProps> = ({
  time,
  isRunning,
  setIsRunning,
  textColor = "#fff",
  setTime,
}) => {
  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
      <Button
        variant="outlined"
        size="small"
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
        sx={{
          minWidth: "36px",
          ml: 1,
          color: textColor,
          borderColor: textColor,
        }}
      >
        ⏹
      </Button>
      <Typography
        variant="body2"
        sx={{ color: textColor, minWidth: "60px", textAlign: "center" }}
      >
        {formatTime(time)}
      </Typography>
    </Box>
  );
};

export default Stopwatch;
