import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

type FullScreenLoadingProps = {
  open: boolean;
  onClose?: () => void;
};

function FullScreenLoading({ open, onClose }: FullScreenLoadingProps) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default FullScreenLoading;
