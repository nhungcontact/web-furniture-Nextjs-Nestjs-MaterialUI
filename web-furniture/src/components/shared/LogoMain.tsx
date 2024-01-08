import React from "react";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import { Box, IconButton, Typography } from "@mui/material";

export const LogoMain = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
    >
      <IconButton
        edge="start"
        aria-label="menu"
        sx={{ "& .MuiSvgIcon-root": { color: `black`, fontSize: "28px" } }}
      >
        <ChairOutlinedIcon />
      </IconButton>
      <Typography
        variant="h2"
        component="div"
      >
        Furnit.
      </Typography>
    </Box>
  );
};
