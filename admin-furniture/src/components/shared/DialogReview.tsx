import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
type Props = {
  handleClose: () => void;
  open: boolean;
  content: string;
};
export default function DialogReview({ handleClose, open, content }: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Review</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className="btn-cancel"
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
