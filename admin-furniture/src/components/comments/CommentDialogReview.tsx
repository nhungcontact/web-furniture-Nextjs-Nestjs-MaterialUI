import useCommentUpdateStatus from "@/hooks/comments/useCommentUpdateStatus";
import { CommentStatus, GetComment } from "@/types/comment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
type Props = {
  handleCloseAlert: (name: string) => void;
  openReview: boolean;
  data: GetComment;
};
export default function CommentDialogReivew({
  handleCloseAlert,
  openReview,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { trigger: updateStatus } = useCommentUpdateStatus(data._id);
  const handleReview = () => {
    console.log("Ok");
    updateStatus({
      body: {
        status: CommentStatus.Approved,
      },
    })
      .then(() => {
        handleCloseAlert("review");
        enqueueSnackbar("successfully", { variant: "success" });
      })
      .catch((e) => {
        enqueueSnackbar(e?.message, { variant: "error" });
      });
  };
  return (
    <>
      <Dialog
        open={openReview}
        onClose={() => handleCloseAlert("close")}
        scroll="paper"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography
            fontWeight={"bold"}
            variant="h5"
          >
            {data.status === CommentStatus.UnApproved ? "Review" : "View"} Comment
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ background: "#F8F8F8" }}
          dividers={true}
        >
          <DialogContentText>
            <Grid container>
              <Grid
                item
                xs={12}
                mb={3}
              >
                <Box
                  display="flex"
                  alignItems="start"
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={"GrayText"}
                    mr={2}
                  >
                    User:
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                    >
                      {data.user.email} ({data.user.username})
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                mb={3}
              >
                <Box
                  display="flex"
                  alignItems="start"
                >
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color={"GrayText"}
                    mr={2}
                  >
                    Blog:
                  </Typography>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                    >
                      {data.blog.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                mb={3}
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  color={"GrayText"}
                  mb={1}
                >
                  Comment detail:
                </Typography>
                <Box
                  p={3}
                  sx={{ background: "#FFFFFF", height: "fit-content", p: 2 }}
                >
                  <Typography
                    variant="body1"
                    mb={4}
                  >
                    Content:<b> {data.comment}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    color="black"
                  >
                    Created At: <b>{new Date(data.createdAt).toLocaleString()}</b>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            variant="contained"
            className="btn-cancel"
            onClick={() => handleCloseAlert("review")}
          >
            Cancel
          </Button>
          {data.status === CommentStatus.UnApproved && (
            <Button
              variant="contained"
              className="btn-action"
              onClick={handleReview}
            >
              Agree
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
