"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

type LoadingOverlayProps = {
  /** Show/Hide overlay */
  open: boolean;
  /** Called when user click on the overlay */
  onClick?: () => void;
};

/** Display a fullscreen loading overlay */
function LoadingOverlay({ open, onClick }: LoadingOverlayProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default LoadingOverlay;
