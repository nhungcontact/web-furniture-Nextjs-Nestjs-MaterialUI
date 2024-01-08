/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useRoomFurnitureCreate from "@/hooks/room-furnitures/useRoomFurnitureCreate";
import { jsonForm } from "@/utils/form";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";

import { FormEvent, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
};
export default function RoomDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createRoom } = useRoomFurnitureCreate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
  const handleSubmitRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    console.log(json);
    const formData = new FormData();
    formData.append("name", json.name as string),
      formData.append("description", json.description as string),
      formData.append("photo", json.photo as string),
      createRoom({
        body: formData as any,
      })
        .then(() => {
          setSelectedImage(null);
          handleClose();
          enqueueSnackbar("successfully", { variant: "success" });
        })
        .catch((e) => {
          setSelectedImage(null);
          enqueueSnackbar(e?.message, { variant: "error" });
        });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          <b>Create Room Furniture</b>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          {/* {title && <DialogContentText mb={3}>{title}</DialogContentText>} */}
          <form
            onSubmit={handleSubmitRoom}
            id="create-room"
          >
            <Grid container>
              <Grid
                item
                xs={12}
                my={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
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
                  defaultValue={dialogValue}
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
                mb={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Description
                </Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  //   value={dialogValue.description}
                  name="description"
                  multiline
                  rows={3}
                  placeholder="Enter a description"
                  type="text"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
              </Grid>
              {/* <Grid
                item
                xs={12}
                mb={1}
              >
                <FormControl>
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      sx={{ display: "inline-flex" }}
                    >
                      Status
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                  </Box>
                  <RadioGroup
                    row
                    aria-labelledby="status-label"
                    name="status"
                  >
                    <FormControlLabel
                      value="ACTIVE"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="INACTIVE"
                      control={<Radio />}
                      label="Inactive"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid> */}
              <Grid
                item
                xs={12}
                mb={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                  marginBottom={1}
                >
                  Photo
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <Grid
                  container
                  justifyContent={"center"}
                  alignItems={"end"}
                  sx={{
                    border: "dashed 2px",
                    padding: "20px",
                    position: "relative",
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
                          alt="Remy Sharp"
                          src={URL.createObjectURL(selectedImage)}
                          width={250}
                          height={200}
                          style={{
                            boxShadow:
                              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
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
                          Name: {selectedImage ? selectedImage?.name : ""} <br />
                          Size: {selectedImage ? selectedImage?.size + " MB" : ""}
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
                      {!selectedImage && (
                        <Grid
                          item
                          xs={12}
                          textAlign={"center"}
                        >
                          <Image
                            src="/images/upload-image.png"
                            alt="upload"
                            width={100}
                            height={100}
                          />
                        </Grid>
                      )}

                      <Grid
                        item
                        xs={12}
                        textAlign={"center"}
                      >
                        {!selectedImage && (
                          <Typography
                            variant="body1"
                            textTransform="capitalize"
                          >
                            The image maximum size is 10MB.
                          </Typography>
                        )}
                        {selectedImage && (
                          <Button
                            className="btn-action"
                            size="small"
                            variant="outlined"
                          >
                            Change Image
                          </Button>
                        )}
                        <input
                          name="photo"
                          type="file"
                          hidden
                          onChange={handleChangeImage}
                        />
                      </Grid>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
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
            form="create-room"
            className="btn-action"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
