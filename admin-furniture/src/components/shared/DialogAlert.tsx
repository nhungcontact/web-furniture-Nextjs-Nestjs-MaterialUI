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
  handleCloseAlert: (name: string) => void;
  openAlert: boolean;
  content: string;
  title: string;
};
export default function DialogAlert({
  handleCloseAlert,
  openAlert,
  content,
  title,
}: Props) {
  return (
    <>
      <Dialog
        open={openAlert}
        onClose={() => handleCloseAlert("close")}
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
            onClick={() => handleCloseAlert("close")}
          >
            Disagree
          </Button>
          <Button
            variant="contained"
            onClick={() => handleCloseAlert("agree")}
            autoFocus
            className="btn-action"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
