/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
import useProductSkuAddReview from "@/hooks/product-skus/useProductSkuAddReview";
import { GetBill } from "@/types/bill";
import { GetProduct } from "@/types/product";
import { GetProductSku } from "@/types/product-sku";
import { GetReview, ReviewStatus } from "@/types/review";
import { GetUser } from "@/types/user";
import { jsonForm } from "@/utils/form";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";
import OptionDetail from "./OptionDetail";

type Props = {
  productSku: GetProductSku;
  handleClose: (i: number, name: string) => void;
  index: number;
  open: boolean;
  product: GetProduct;
  bill: GetBill;
  user: GetUser;
  review?: GetReview;
};

const labelStarts: { [indexStart: string]: string } = {
  1: "Bad",
  2: "Unsatisfied",
  3: "Normal",
  4: "Satisfied",
  5: "Great",
};

function getLabelText(valueStart: number) {
  return `${valueStart} Star${valueStart !== 1 ? "s" : ""}, ${labelStarts[valueStart]}`;
}

export default function ReviewOrder({
  productSku,
  handleClose,
  index,
  open,
  product,
  bill,
  user,
  review,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef<HTMLFormElement>(null);

  const { trigger: addReview } = useProductSkuAddReview(productSku._id);
  const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
  const [valueStart, setValueStart] = useState<number | null>(null);

  const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    const newFiles = Array.from(files || []);
    const validFiles = newFiles.filter((file) => file.type.startsWith("image/"));
    if (files) {
      if (selectedImage) {
        if (selectedImage.length + validFiles.length <= 5) {
          setSelectedImage([...selectedImage, ...validFiles]);
        } else {
          enqueueSnackbar("Upload maximum is 5 pictures", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      } else {
        setSelectedImage(validFiles);
      }
    }
  };
  const handleClearImage = (index: number) => {
    if (selectedImage) {
      const data = selectedImage?.filter((_, i) => i !== index);
      setSelectedImage(data);
    }
  };

  const handleAddReview = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    const formData = new FormData();
    if (user && productSku._id && bill._id && product) {
      formData.append("productSku", productSku._id as string);
      formData.append("product", product._id as string);
      formData.append("user", user._id as string);
      formData.append("bill", bill._id as string);
      formData.append("content", json.content as string);
      formData.append("rating", Number(json.rating) as any);
      if (selectedImage) {
        selectedImage.forEach((photo) => {
          formData.append("photos", photo as any);
        });
      }
      addReview({
        body: formData as any,
      })
        .then(() => {
          enqueueSnackbar("Successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          if (formRef.current) {
            formRef.current.reset();
          }
          setSelectedImage(null);
          handleClose(index, "review");
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => handleClose(index, "review")}
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            textTransform={"capitalize"}
          >
            {!!review ? "View Review" : "Product reviews"}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Container>
            <form
              onSubmit={handleAddReview}
              id="add-review"
              ref={formRef}
            >
              <Grid container>
                {review && review.status === ReviewStatus.Approved ? (
                  <Grid>
                    <Alert severity="success">Reviewed Rating!</Alert>
                  </Grid>
                ) : (
                  <Grid>
                    <Alert severity="warning">Unapproved Reviews!</Alert>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                >
                  <Box
                    display="flex"
                    justifyContent={"start"}
                    my={2}
                  >
                    <Image
                      src={productSku.photos[0].imageURL ?? "/"}
                      alt={productSku.photos[0].name ?? "-"}
                      width={120}
                      height={100}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      unoptimized
                    />
                    <Box sx={{ ml: 3 }}>
                      <Typography
                        variant="body1"
                        color="black"
                        fontWeight={"bold"}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        display={"inline-flex"}
                      >
                        Product Classification:
                      </Typography>{" "}
                      {productSku.optionValues &&
                        productSku.optionValues.length &&
                        productSku.optionValues.map((optionValue, i) => (
                          <>
                            <OptionDetail
                              key={optionValue._id}
                              data={optionValue}
                            />
                            {i !== productSku.optionValues.length - 1 && " / "}
                          </>
                        ))}
                      <br />
                      <Typography variant="body2">
                        Price:{" "}
                        <b
                          style={{
                            marginRight: "10px",
                            color: `${!!productSku.priceDiscount ? "red" : "black"}`,
                          }}
                        >
                          {!!productSku.priceDiscount ? (
                            <>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(productSku.priceDiscount ?? 0) ?? "-"}
                            </>
                          ) : (
                            <>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(productSku.price ?? 0) ?? "-"}
                            </>
                          )}
                        </b>
                        {!!productSku.percent && (
                          <b
                            style={{
                              textDecorationLine: "line-through",
                              display: "inline-flex",
                              color: "GrayText",
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(productSku.price) ?? "-"}
                          </b>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {!review && (
                  <Grid
                    item
                    xs={12}
                    mb={2}
                  >
                    <Box
                      mb={1}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <Typography
                        variant="body2"
                        color="black"
                        fontWeight={"bold"}
                        sx={{ mr: 1, display: "inline-flex" }}
                      >
                        Product Quanlity
                      </Typography>

                      <Rating
                        name="rating"
                        value={valueStart}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValueStart(newValue);
                        }}
                        size="large"
                      />
                      {valueStart !== null && (
                        <Box sx={{ ml: 2 }}>{labelStarts[valueStart]}</Box>
                      )}
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                >
                  <Box sx={{ background: "#F8F8F8", px: 4, py: 3 }}>
                    {!review ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Type your review ..."
                        name="content"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            background: "white",
                            borderRadius: 0,
                            "& fieldset": {
                              borderColor: "#e7e7e7",
                            },
                            "&:hover fieldset": {
                              borderColor: "#e7e7e7",
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #e7e7e7",
                            },
                          },
                        }}
                      />
                    ) : (
                      <Box>
                        <Typography
                          variant="body1"
                          mb={2}
                        >
                          Rating: <b>{review.rating} start</b>
                        </Typography>
                        <Typography variant="body1">
                          Content: <b>{review.content}</b>
                        </Typography>
                      </Box>
                    )}
                    <Grid
                      container
                      justifyContent={"start"}
                      alignItems={"start"}
                      spacing={2}
                      mt={1}
                    >
                      <Grid
                        item
                        xs={12}
                      >
                        <Typography variant="body1"> Photos: </Typography>
                      </Grid>
                      {selectedImage &&
                        selectedImage.length > 0 &&
                        selectedImage.map((item, index) => (
                          <Grid
                            item
                            xs={3}
                            md={2}
                            key={index}
                          >
                            <Box sx={{ position: "relative", width: "100px" }}>
                              <IconButton
                                size="small"
                                sx={{ position: "absolute", right: 2, top: 1, p: "1px" }}
                                onClick={() => handleClearImage(index)}
                              >
                                <Close
                                  fontSize="small"
                                  sx={{
                                    background: "rgba(0,0,0,.4)",
                                    color: "white",
                                    borderRadius: "50px",
                                  }}
                                />
                              </IconButton>
                              <Image
                                src={URL.createObjectURL(item) ?? "/"}
                                height={100}
                                width={100}
                                alt="photo1"
                                style={{
                                  border: "dashed 1px grey",
                                }}
                              />
                            </Box>
                          </Grid>
                        ))}

                      {selectedImage &&
                        selectedImage.length < 5 &&
                        selectedImage.length > 0 && (
                          <Grid
                            item
                            xs={3}
                            md={2}
                          >
                            <Button
                              component="label"
                              sx={{
                                ":hover": {
                                  background: "none",
                                },
                                border: "dashed 1px grey",
                                padding: "32px",
                                borderRadius: 0,
                                position: "relative",
                              }}
                            >
                              <AddPhotoAlternate
                                color="disabled"
                                fontSize="large"
                              />
                              {Math.ceil(5 - selectedImage.length)}/5
                              <input
                                name="photo"
                                type="file"
                                multiple
                                hidden
                                onChange={handleChangeImage}
                                accept="image/png, image/jpeg"
                              />
                            </Button>
                          </Grid>
                        )}
                      {!!review &&
                        !!review.photos &&
                        !!review.photos.length &&
                        review.photos.map((item) => (
                          <Grid
                            item
                            xs={4}
                            // md={2}
                            key={item._id}
                          >
                            <Box sx={{ position: "relative", width: "100px" }}>
                              <Image
                                src={item.imageURL ?? "/"}
                                height={200}
                                width={200}
                                alt={item.name ?? "-"}
                                style={{
                                  border: "dashed 1px grey",
                                }}
                                unoptimized
                              />
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                    {review && (
                      <Box mt={2}>
                        <Typography variant="body1">
                          Time: <b>{new Date(review.updatedAt).toLocaleString()}</b>
                        </Typography>
                      </Box>
                    )}

                    {!review && !selectedImage?.length && (
                      <Button
                        component="label"
                        sx={{
                          position: "relative",
                          borderRadius: 0,
                          my: 1,
                        }}
                        variant="outlined"
                        startIcon={<AddPhotoAlternate color="primary" />}
                      >
                        More Photos
                        <input
                          name="photo"
                          type="file"
                          multiple
                          hidden
                          onChange={handleChangeImage}
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                    )}
                    {!review && (
                      <Typography
                        variant="body2"
                        color="red"
                      >
                        Only upload 5 photos
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Container>
        </DialogContent>
        <DialogActions sx={{ mx: 2 }}>
          <Button
            autoFocus
            variant="contained"
            size="small"
            sx={{ textTransform: "capitalize", my: 1, borderRadius: 0, width: "150px" }}
            color="inherit"
            onClick={() => handleClose(index, "review")}
            className="btn-cancel"
          >
            Cancel
          </Button>
          {!review && (
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "capitalize", my: 1, borderRadius: 0, width: "150px" }}
              type="submit"
              form="add-review"
              className="btn-action"
            >
              Post Review
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
