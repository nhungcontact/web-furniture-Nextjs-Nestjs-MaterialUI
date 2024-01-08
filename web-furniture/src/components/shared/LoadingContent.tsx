"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

type LoadingContentProps = {
  caption?: string;
};

/** Display a loading indicator inside of a container */
function LoadingContent({ caption }: LoadingContentProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: "20%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <CircularProgress />
        <Typography
          variant="caption"
          display={"block"}
          mt={2}
        >
          {caption}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingContent;
