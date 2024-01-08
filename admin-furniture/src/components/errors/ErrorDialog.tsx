"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type ErrorDialogProps = {
  open: boolean;
  error: Error & { digest?: string };
  title?: string;
  onClose?: () => void;
};

function ErrorDialog({ open, error, title, onClose }: ErrorDialogProps) {
  return (
    <Dialog
      open={open}
      fullWidth
    >
      <DialogTitle color={"error"}>{title || error.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {error.message} ({error.digest})
        </DialogContentText>
      </DialogContent>
      {!!onClose && (
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ErrorDialog;
