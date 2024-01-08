/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useOptionList from "@/hooks/options/useOptionList";
import { Option } from "@/types/option";
import { jsonForm } from "@/utils/form";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";

import useOptionValueCreate from "@/hooks/option-values/useOptionValueCreate";
import useOptionValueUpdate from "@/hooks/option-values/useOptionValueUpdate";
import { GetOptionValue } from "@/types/option-value";
import { Photo } from "@/types/photo";
import { FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  option?: Option;
  data?: GetOptionValue;
};
export default function OptionValueDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  option,
  data,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: listOption } = useOptionList({});
  const [valOption, setValOption] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createOptionValue } = useOptionValueCreate();
  const { trigger: updateOptionValue } = useOptionValueUpdate(data ? data._id : "");
  const [selectedImage, setSelectedImage] = useState<File | null | Photo>(null);

  const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      setSelectedImage(files[0]);
    }
  };
  const handleClearImage = () => {
    setSelectedImage(null);
  };

  const handleSubmitOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    const formData = new FormData();
    formData.append("name", json.name as string);
    formData.append("optionSku", option ? option._id : valOption);
    formData.append("photo", json.photo as string);
    if (data) {
      updateOptionValue({
        body: formData as any,
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setSelectedImage(null);
          handleClose();
          if (formRef.current) {
            formRef.current.reset();
          }
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
      createOptionValue({
        body: formData as any,
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          setSelectedImage(null);
          handleClose();
          if (formRef.current) {
            formRef.current.reset();
          }
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

  useEffect(() => {
    if (data && data.photo) {
      setSelectedImage(data.photo);
      setValOption(data.optionSku._id);
    }
  }, [data]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <b>{data ? "Update" : "Create"} Option Value</b>
          {title && <DialogContentText>{title}</DialogContentText>}
        </DialogTitle>

        <DialogContent sx={{ background: "#F8F8F8" }}>
          <DialogContentText id="scroll-dialog-description">
            <form
              ref={formRef}
              onSubmit={handleSubmitOption}
              id="create-option"
            >
              <Grid
                container
                py={2}
              >
                <Grid
                  item
                  xs={12}
                  mb={2}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"600"}
                    color="black"
                    mb={1}
                    sx={{ display: "inline-flex" }}
                  >
                    Name
                  </Typography>
                  <Typography
                    color="red"
                    sx={{ display: "inline-flex" }}
                  >
                    *
                  </Typography>
                  <TextField
                    fullWidth
                    margin="dense"
                    id="name"
                    defaultValue={data ? data.name : dialogValue}
                    name="name"
                    type="text"
                    variant="outlined"
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
                  mb={2}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"600"}
                    color="black"
                    mb={1}
                    sx={{ display: "inline-flex" }}
                  >
                    Option
                  </Typography>
                  <Typography
                    color="red"
                    sx={{ display: "inline-flex" }}
                  >
                    *
                  </Typography>
                  {option ? (
                    <TextField
                      fullWidth
                      margin="dense"
                      id="name"
                      name="optionSku"
                      type="text"
                      variant="outlined"
                      value={option.name}
                      disabled
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                  ) : (
                    <Autocomplete
                      disablePortal
                      defaultValue={data ? data.optionSku : null}
                      onChange={(event, newValue) => {
                        setValOption(newValue?._id as string);
                      }}
                      getOptionLabel={(option) => {
                        // e.g. value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        return option.name;
                      }}
                      options={
                        listOption && listOption.items && listOption.items.length > 0
                          ? listOption?.items
                          : []
                      }
                      readOnly={option ? true : false}
                      fullWidth
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="optionSku"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              background: "#FFFFFF",
                            },
                          }}
                        />
                      )}
                    />
                  )}
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
                  <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"end"}
                    sx={{
                      border: "dashed 2px",
                      padding: "20px",
                      position: "relative",
                      background: "#FFFFFF",
                    }}
                  >
                    {selectedImage && (
                      <>
                        <IconButton
                          onClick={handleClearImage}
                          sx={{ position: "absolute", top: "1px", right: "1px" }}
                        >
                          <Close />
                        </IconButton>
                        <Grid
                          item
                          xs={12}
                          textAlign={"center"}
                        >
                          <Image
                            alt={
                              selectedImage && selectedImage.name
                                ? selectedImage.name
                                : "Value"
                            }
                            src={
                              selectedImage && (selectedImage as Photo).imageURL
                                ? (selectedImage as Photo).imageURL
                                : URL.createObjectURL(selectedImage as File)
                            }
                            width={250}
                            height={200}
                            unoptimized
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                              width: "fit-content",
                            }}
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          textAlign={"center"}
                        >
                          <Typography
                            variant="caption"
                            fontWeight={"bold"}
                          >
                            Name: {(selectedImage && selectedImage?.name) ?? "-"} <br />
                            {selectedImage && (selectedImage as File).size
                              ? "Size: " + (selectedImage as File).size + " MB"
                              : ""}
                          </Typography>
                        </Grid>
                      </>
                    )}
                    <Button
                      component="label"
                      sx={{
                        ":hover": {
                          background: "none",
                        },
                      }}
                    >
                      <Grid container>
                        {selectedImage ? (
                          <Grid
                            item
                            xs={12}
                            textAlign={"center"}
                          >
                            <Typography
                              variant="caption"
                              fontWeight={"bold"}
                              color="primary"
                            >
                              Change Image
                            </Typography>
                          </Grid>
                        ) : (
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              textAlign={"center"}
                              mb={2}
                            >
                              <Image
                                src="/images/upload-image.png"
                                alt="upload"
                                width={100}
                                height={100}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              textAlign={"center"}
                              mb={2}
                            >
                              <Typography
                                variant="body1"
                                textTransform="capitalize"
                              >
                                The image maximum size is 10MB.
                              </Typography>
                            </Grid>
                          </Grid>
                        )}
                        <input
                          name="photo"
                          type="file"
                          hidden
                          onChange={handleChangeImage}
                          accept="image/png, image/jpeg"
                        />
                        {/* </Grid> */}
                      </Grid>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            size="medium"
            variant="contained"
            onClick={handleClose}
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            size="medium"
            variant="contained"
            type="submit"
            color="primary"
            form="create-option"
            className="btn-action"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
