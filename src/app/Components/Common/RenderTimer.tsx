import { TimerOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import * as React from "react";

const RenderTimer = ({
  absolutePosition,
  time,
}: {
  absolutePosition?: boolean;
  time: string | number;
}) => {
  const render = () => {
    if (time === undefined) return "-";

    time = Number(time);
    const mins = Math.floor(time / 60);
    const secs = time % 60;

    if (mins > 0) {
      return (
        <Box>
          {mins}
          <span>m</span>
          {secs}
          <span>s</span>
        </Box>
      );
    }
    return (
      <Box>
        {secs}
        <span>s</span>
      </Box>
    );
  };

  return (
    <Typography
      variant='h6'
      display='inline-flex'
      alignItems='center'
      sx={{
        ...(absolutePosition
          ? { position: "absolute", top: 12, left: 12 }
          : {}),
        "& svg": { mr: 6 },
        "& span": {
          color: "text.secondary",
          fontSize: 12,
          fontWeight: 400,
          mr: 2,
        },
      }}
    >
      <TimerOutlined />
      {render()}
    </Typography>
  );
};

export default RenderTimer;
