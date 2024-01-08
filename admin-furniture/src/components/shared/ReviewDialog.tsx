import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
type Props = {
  handleCloseReview: (name: string) => void;
  openReview: boolean;
  content: string;
  title: string;
};
export default function DialogAlert({
  handleCloseReview,
  openReview,
  content,
  title,
}: Props) {
  return (
    <>
      <Dialog
        open={openReview}
        onClose={() => handleCloseReview("close")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            fontWeight={"bold"}
            variant="h5"
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="contained"
            className="btn-cancel"
            onClick={() => handleCloseReview("close")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleCloseReview("review")}
            autoFocus
            className="btn-action"
          >
            Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
