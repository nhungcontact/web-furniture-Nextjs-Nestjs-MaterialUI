/* eslint-disable max-lines */
import useBlogUpdateStatus from "@/hooks/blogs/useBlogUpdateStatus";
import { BlogStatus, GetBlog } from "@/types/blog";
import {
  Alert,
  AlertTitle,
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
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState } from "react";
import DialogAlert from "../shared/DialogAlert";
type Props = {
  handleClose: () => void;
  open: boolean;
  data: GetBlog;
};
export default function BlogDialogReview({ handleClose, open, data }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [reviewd, setReviewed] = useState<boolean>(
    data.status === BlogStatus.Approved ? true : false,
  );
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { trigger: updateStatus } = useBlogUpdateStatus(data._id);
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = (name: string) => {
    if (name === "close") {
      setOpenAlert(false);
    }
    if (name === "agree") {
      updateStatus({
        body: {
          status: BlogStatus.Approved,
        },
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setOpenAlert(false);
          setReviewed(true);
          handleClose();
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setOpenAlert(false);
        });
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography
          variant="h5"
          fontWeight={"bold"}
        >
          Reviews
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{ background: "#F8F8F8" }}
        dividers={true}
      >
        <DialogContentText id="scroll-dialog-description">
          <Grid
            container
            columnSpacing={4}
          >
            {reviewd ? (
              <Grid
                item
                xs={12}
                mb={4}
              >
                <Alert severity="success">
                  <AlertTitle>Blogs has been reviewed!</AlertTitle>
                </Alert>
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                mb={4}
              >
                <Alert severity="warning">
                  <AlertTitle>Blogs has not been reviewed!</AlertTitle>
                </Alert>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                Name:
              </Typography>
              <Typography variant="body1">{data.name ?? "-"}</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                Room:
              </Typography>
              <Typography variant="body1">{data.roomFurniture.name}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                Category:
              </Typography>
              <Typography variant="body1">{data.category.name}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                Actor:
              </Typography>
              <Typography variant="body1">{data.actor ?? "-"}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                New:
              </Typography>
              <Typography variant="body1">{data.isNew ? "true" : "false"}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
              >
                Description:
              </Typography>
              <Typography variant="body1">{data.description ?? "-"}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                mb={1}
              >
                Photos:
              </Typography>
              <Grid
                container
                spacing={4}
                justifyContent="start"
              >
                <Grid
                  item
                  xs={6}
                  md={3}
                  sx={{
                    position: "relative",
                  }}
                >
                  <Image
                    src={data.photo.imageURL ?? "/"}
                    alt="Profile Pic"
                    width={260}
                    height={200}
                    style={{
                      width: "-webkit-fill-available",
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    }}
                    unoptimized
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                mb={1}
              >
                Content:
              </Typography>
              <Box
                sx={{
                  paddingX: "20px",
                  background: "#F8F8F8",
                  textAlign: "justify",
                  color: "black",
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: data.content ?? "-" }} />
              </Box>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, px: 3 }}>
        <Button
          className="btn-cancel"
          variant="contained"
          onClick={handleClose}
        >
          Cancel
        </Button>
        {!reviewd && (
          <Button
            className="btn-action"
            variant="contained"
            onClick={handleOpenAlert}
          >
            Review
          </Button>
        )}
        <DialogAlert
          openAlert={openAlert}
          handleCloseAlert={handleCloseAlert}
          content="Blogs after being reviewed, will be displayed on the screen."
          title="Do you want to review blogs?"
        />
      </DialogActions>
    </Dialog>
  );
}
