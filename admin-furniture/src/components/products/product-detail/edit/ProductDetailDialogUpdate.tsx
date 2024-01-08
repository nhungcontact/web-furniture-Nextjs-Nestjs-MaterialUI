/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Photo } from "@/types/photo";
import { GetProductSku } from "@/types/product-sku";
import { Add, Close, RestartAlt } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import AutocompleteDialogOption from "./AutocompleteDialogOption";
import AutocompleteDialogOptionValue from "./AutocompleteDialogOptionValue";

import useProductSkuCreate from "@/hooks/product-skus/useProductSkuCreate";
import useProductSkuUpdate from "@/hooks/product-skus/useProductSkuUpdate";
import { GetOptionValue } from "@/types/option-value";
import { jsonForm } from "@/utils/form";
import { generateRandomSku } from "@/utils/number-sku-random";
import { useParams } from "next/dist/client/components/navigation";
import useProductDetail from "@/hooks/products/useProductDetail";
import { useSnackbar } from "notistack";

export type Variant = {
  optionSku: string;
  optionValue: string;
};

const initialVariant = {
  optionSku: "",
  optionValue: "",
};

type Props = {
  handleClose: () => void;
  open: boolean;
  data?: GetProductSku;
  title?: string;
};

export default function ProductDetailDialogUpdate({
  handleClose,
  open,
  data,
  title,
}: Props) {
  const param = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data: product } = useProductDetail(param.id as string);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photos, setPhotos] = useState<Photo[]>(
    data && data.photos && data.photos.length ? data.photos : [],
  );
  const [optionValues, setOptionValues] = useState<GetOptionValue[]>(
    data && data.optionValues.length > 0 ? data.optionValues : [],
  );

  const [variants, setVariants] = useState<Variant[]>(
    data && data.optionValues
      ? data.optionValues.map((item) => ({
          optionSku: item.optionSku._id,
          optionValue: item._id,
        }))
      : [],
  );

  const { trigger: updateProductSku } = useProductSkuUpdate(data ? data._id : "");
  const { trigger: createProductSku } = useProductSkuCreate();

  const handleAddOptionValue = () => {
    if (variants) {
      setVariants([...variants, initialVariant]);
    }
  };
  const handleSelectChange = (name: string, value: string, index: number): void => {
    if (optionValues && variants) {
      const updatedVariants = [...variants];
      updatedVariants[index] = {
        ...variants[index],
        [name]: value,
      };
      setVariants(updatedVariants);
    }
  };
  const handleRemoveSkuValue = (val: number) => {
    console.log(variants);
    if (variants) {
      const removeData = variants.filter((_, index) => index !== val);
      setVariants(removeData);
    }
  };

  const handleRefreshSkuValue = () => {
    if (data) {
      setOptionValues(data.optionValues);
    }
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const validFiles = newFiles.filter((file) => file.type.startsWith("image/"));

    setSelectedFiles([...selectedFiles, ...validFiles]);
  };
  const handleFileRemove = (index: number) => {
    const removeFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(removeFiles);
  };
  const handleFileDataRemove = (index: number) => {
    console.log("product", photos);

    const removeFiles = photos.filter((_, i) => i !== index);
    setPhotos(removeFiles);
  };

  const handleUpdateProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      console.log({
        ...json,
        quantityInStock: Number(json.quantityInStock),
        percent: Number(json.percent),
        price: Number(json.price),
        priceDiscount: Number(json.priceDiscount),
        photos: selectedFiles && selectedFiles.length ? selectedFiles : photos,
        optionValues: variants
          ? variants.map((item) => item.optionValue)
          : data.optionValues,
      });
      const formData = new FormData();
      formData.append("product", param.id as string);
      formData.append("quantitySold", 0 as any);
      formData.append("content", json.content as string);
      formData.append("price", Number(json.price) as any);
      formData.append("priceDiscount", Number(json.priceDiscount) as any);
      formData.append("percent", Number(json.percent) as any);
      formData.append("quantityInStock", Number(json.quantityInStock) as any);
      formData.append(
        "optionValues",
        variants ? variants.map((item) => item.optionValue) : (data.optionValues as any),
      );
      formData.append("photos", JSON.stringify(photos) as any);
      if (selectedFiles.length) {
        selectedFiles.forEach((photo) => {
          formData.append("photoUpdates", photo as any);
        });
      }

      updateProductSku({
        body: formData as any,
      })
        .then(() => {
          alert("OK");
          setSelectedFiles([]);
          setVariants([]);
          if (formRef.current) {
            formRef.current.reset();
          }
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
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
        });
    } else {
      if (variants && variants.length) {
        const sku = generateRandomSku();
        const formData = new FormData();
        formData.append("product", param.id as any);
        formData.append("numberSKU", sku as string);
        formData.append("content", json.content as string);
        formData.append("price", Number(json.price) as any);
        formData.append("priceDiscount", Number(json.priceDiscount) as any);
        formData.append("percent", Number(json.percent) as any);
        formData.append("quantityInStock", Number(json.quantityInStock) as any);
        formData.append("optionValues", variants.map((item) => item.optionValue) as any);
        selectedFiles.forEach((photo) => {
          formData.append("photos", photo as any);
        });
        createProductSku({
          body: formData as any,
        })
          .then(() => {
            setSelectedFiles([]);
            setVariants([]);
            if (formRef.current) {
              formRef.current.reset();
            }
            enqueueSnackbar("successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
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
          });
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        scroll="paper"
      >
        <DialogTitle>
          <b>{data ? "Update" : "Create"} Product Detail</b>
        </DialogTitle>
        <DialogContent
          sx={{ background: "#F8F8F8" }}
          dividers={true}
        >
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}

          <Grid container>
            {variants &&
              variants.length > 0 &&
              variants.map((item, i) => (
                <Grid
                  item
                  xs={12}
                  key={i}
                  mb={1}
                >
                  <Grid
                    container
                    columnSpacing={2}
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={variants.length > 1 ? 5 : 6}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={"600"}
                        marginBottom={1}
                        color="black"
                      >
                        Option
                      </Typography>
                      <AutocompleteDialogOption
                        handleSelectChange={handleSelectChange}
                        option={item.optionSku}
                        index={i}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={"600"}
                        marginBottom={1}
                        color="black"
                      >
                        Option value
                      </Typography>
                      <AutocompleteDialogOptionValue
                        handleSelectChange={handleSelectChange}
                        variant={item}
                        index={i}
                      />
                    </Grid>
                    {variants.length > 1 && (
                      <Grid
                        item
                        xs={1}
                      >
                        <Button onClick={() => handleRemoveSkuValue(i)}>
                          <Close />
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              ))}
            {variants && variants.length < 3 && (
              <Grid
                item
                xs={12}
                textAlign={"end"}
              >
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  className="btn-action"
                  onClick={handleAddOptionValue}
                  sx={{ mr: 2, width: "120px" }}
                >
                  Add Variant
                </Button>
                <Button
                  variant="outlined"
                  className="btn-action"
                  onClick={handleRefreshSkuValue}
                  startIcon={<RestartAlt />}
                  sx={{ width: "120px" }}
                >
                  Refresh
                </Button>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              my={2}
            >
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <form
                onSubmit={handleUpdateProduct}
                id="update-product-detail"
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                  >
                    <Grid
                      container
                      columnSpacing={2}
                      alignItems={"center"}
                    >
                      <Grid
                        item
                        xs={5}
                        mb={1}
                      >
                        <Typography
                          variant="body1"
                          fontWeight={"600"}
                          color="black"
                          mb={1}
                          sx={{ display: "inline-flex" }}
                        >
                          Price
                        </Typography>
                        <Typography
                          color="red"
                          sx={{ display: "inline-flex" }}
                        >
                          *
                        </Typography>
                        <TextField
                          fullWidth
                          defaultValue={data ? data.price : 0}
                          name="price"
                          placeholder="Enter a price"
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                              <InputAdornment position="start">%</InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#FFFFFF",
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={5}
                        mb={1}
                      >
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          mb={1}
                          color="black"
                        >
                          Price Discount
                        </Typography>
                        <TextField
                          fullWidth
                          defaultValue={data ? data.priceDiscount : 0}
                          name="priceDiscount"
                          placeholder="Enter a price discount"
                          //   type="number"
                          InputProps={{
                            inputProps: { min: 0 },
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#FFFFFF",
                            },
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        mb={1}
                      >
                        <Typography
                          variant="body1"
                          fontWeight={"bold"}
                          marginBottom={1}
                          color="black"
                        >
                          Percent
                        </Typography>
                        <TextField
                          fullWidth
                          defaultValue={data ? data.percent : 0}
                          name="percent"
                          placeholder="Enter a percent"
                          type="number"
                          InputProps={{
                            inputProps: { min: 0, max: 100 },
                            startAdornment: (
                              <InputAdornment position="start">%</InputAdornment>
                            ),
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#FFFFFF",
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    mb={1}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      marginBottom={1}
                      color="black"
                    >
                      Quantity in stock
                    </Typography>
                    <TextField
                      fullWidth
                      defaultValue={data ? data.quantityInStock : 0}
                      name="quantityInStock"
                      placeholder="Enter a quantity"
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    mb={1}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      marginBottom={1}
                      color="black"
                    >
                      Content
                    </Typography>
                    <TextField
                      fullWidth
                      defaultValue={data ? data.content : ""}
                      name="content"
                      multiline
                      rows={4}
                      placeholder="Enter a content"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      mb={1}
                      sx={{ display: "inline-flex" }}
                    >
                      Photo
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                    <Box
                      sx={{
                        textAlign: "center",
                        border: ".125rem dashed rgba(231,234,243)",
                        padding: "3rem 3rem",
                        background: "#FFFFFF",
                      }}
                    >
                      <Grid
                        container
                        spacing={4}
                        justifyContent="start"
                      >
                        {selectedFiles &&
                          selectedFiles.length > 0 &&
                          selectedFiles.map((photo, i) => (
                            <Grid
                              item
                              xs={6}
                              md={3}
                              key={i}
                              sx={{
                                position: "relative",
                              }}
                            >
                              <Box
                                sx={{
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                                }}
                              >
                                <Image
                                  src={URL.createObjectURL(photo) ?? "/"}
                                  alt="Profile Pic"
                                  width={240}
                                  height={200}
                                  style={{
                                    width: "-webkit-fill-available",
                                  }}
                                />
                              </Box>

                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleFileRemove(i)}
                                sx={{
                                  position: "absolute",
                                  top: "30px",
                                  right: "-16px",
                                  padding: "2px",
                                  borderRadius: "50px",
                                  minWidth: "14px",
                                }}
                              >
                                <Close />
                              </Button>
                            </Grid>
                          ))}
                        {photos &&
                          photos.length > 0 &&
                          photos.map((photo, i) => (
                            <Grid
                              item
                              xs={6}
                              md={3}
                              key={i}
                              sx={{
                                position: "relative",
                              }}
                            >
                              <Image
                                src={photo.imageURL ?? "/"}
                                alt="Profile Pic"
                                width={240}
                                height={200}
                                style={{
                                  width: "-webkit-fill-available",
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                                }}
                                unoptimized
                              />

                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleFileDataRemove(i)}
                                sx={{
                                  position: "absolute",
                                  top: "30px",
                                  right: "-16px",
                                  padding: "2px",
                                  borderRadius: "50px",
                                  minWidth: "14px",
                                }}
                              >
                                <Close />
                              </Button>
                            </Grid>
                          ))}
                      </Grid>
                      <Box sx={{ my: 6 }}>
                        <Button
                          component="label"
                          variant="contained"
                          className="btn-action"
                          size="small"
                        >
                          Upload Photo
                          <input
                            hidden
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg"
                          />
                        </Button>
                        <Typography
                          variant="body1"
                          sx={{ marginTop: 2 }}
                        >
                          Allowed PNG or JPEG. Max size of 800K.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            variant="contained"
            onClick={handleClose}
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            form="update-product-detail"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
