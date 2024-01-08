/* eslint-disable max-lines */
import useReviewUpdate from "@/hooks/reviews/useReviewUpdate";
import { GetReview, ReviewStatus } from "@/types/review";
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
import Image from "next/image";
import { useSnackbar } from "notistack";
type Props = {
  handleCloseAlert: (name: string) => void;
  openReview: boolean;
  data: GetReview;
};
export default function ReviewDialogReivew({
  handleCloseAlert,
  openReview,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { trigger: updateStatus } = useReviewUpdate(data._id);
  const handleReview = () => {
    console.log("Ok");
    updateStatus({
      body: {
        status: ReviewStatus.Approved,
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
            {data.status === ReviewStatus.Approved
              ? "View Review"
              : "Reviewing Product Ratings"}
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
                <Typography
                  variant="body1"
                  color="GrayText"
                  fontWeight={"bold"}
                  display={"inline-flex"}
                  mr={2}
                >
                  User:{" "}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  display={"inline-flex"}
                >
                  {data.user.email} ({data.user.username})
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                mb={3}
              >
                <Typography
                  variant="body1"
                  mb={2}
                  color="GrayText"
                  fontWeight={"bold"}
                >
                  Product:
                </Typography>
                <Box
                  display="flex"
                  alignItems="start"
                >
                  <Image
                    src={data.productSku.photos[0].imageURL ?? "/"}
                    alt={data.productSku.numberSKU}
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <Box ml={3}>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                    >
                      {data.productSku.product.name}
                    </Typography>

                    {data.productSku.optionValues &&
                      data.productSku.optionValues.length &&
                      data.productSku.optionValues.map((item) => {
                        return (
                          <Typography
                            key={item._id}
                            variant="body1"
                            color="black"
                          >
                            {item.optionSku.name}: {item.name}
                          </Typography>
                        );
                      })}
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
                  mb={2}
                  color="GrayText"
                  fontWeight={"bold"}
                >
                  Review detail:
                </Typography>
                <Box
                  p={3}
                  sx={{ background: "#FFFFFF", height: "fit-content", p: 2 }}
                >
                  <Typography
                    variant="body1"
                    mb={1}
                  >
                    Ratings: <b>{data.rating} start</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={1}
                  >
                    Content: <b>{data.content}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={1}
                  >
                    Created At: <b>{new Date(data.createdAt).toLocaleString()}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={1}
                  >
                    Photo:
                  </Typography>
                  <Grid
                    container
                    columnSpacing={2}
                  >
                    {data.photos &&
                      data.photos.length &&
                      data.photos.map((photo) => (
                        <Grid
                          item
                          xs={4}
                          md={3}
                          key={photo._id}
                        >
                          <Image
                            src={photo.imageURL ?? "/"}
                            alt={photo.name ?? "-"}
                            width={200}
                            height={200}
                            unoptimized
                            style={{
                              width: "-webkit-fill-available",
                              height: "-webkit-fill-available",
                            }}
                          />
                        </Grid>
                      ))}
                  </Grid>
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
          {data.status === ReviewStatus.UnApproved && (
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
