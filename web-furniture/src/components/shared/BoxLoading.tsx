import { Box, CircularProgress } from "@mui/material";
import React from "react";

function BoxLoading() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: "20%" }}>
      <CircularProgress />
    </Box>
  );
}

export default BoxLoading;
