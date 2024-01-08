/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useRoomFurnitureUpdate from "@/hooks/room-furnitures/useRoomFurnitureUpdate";
import { RoomFurniture } from "@/types/room-furniture";
import { jsonForm } from "@/utils/form";
import { Close } from "@mui/icons-material";
import {
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

import { FormEvent, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: RoomFurniture;
};
export default function RoomDialogUpdate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
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
  const { trigger: updateRoom } = useRoomFurnitureUpdate(data?._id as string);
  const handleUpdateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    const formData = new FormData();
    formData.append("name", json.name as string),
      formData.append("description", json.description as string),
      formData.append("photo", selectedImage ? selectedImage : (json.photo as string)),
      updateRoom({
        body: formData as any,
      })
        .then(() => {
          handleClose();
          enqueueSnackbar("successfully", { variant: "success" });
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, { variant: "error" });
        });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          <b>Update Room Furniture</b>
        </DialogTitle>
        <DialogContent>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
          <form
            onSubmit={handleUpdateRoom}
            id="update-room"
          >
            <Grid container>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data ? data.name : dialogValue}
                  label="Name"
                  name="name"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data && data.description}
                  name="description"
                  label="Description"
                  type="text"
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                xs={12}
                mb={2}
              >
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
                  {(selectedImage || (data && data?.photo)) && (
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
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage as File)
                              : (data?.photo?.imageURL as string)
                          }
                          width={250}
                          height={200}
                          unoptimized
                          style={{
                            border: "1px solid #d9d9d9",
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
                          {selectedImage
                            ? "Name: " + selectedImage?.name
                            : "Name:  " + data?.photo.name}{" "}
                          <br />
                          {selectedImage ? "Size: " + selectedImage?.size + " MB" : ""}
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
                      {!selectedImage && !data && (
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
                        {!selectedImage && !data && (
                          <Typography
                            variant="body1"
                            textTransform="capitalize"
                          >
                            The image maximum size is 10MB.
                          </Typography>
                        )}
                        {(selectedImage || data) && (
                          <Typography
                            variant="caption"
                            fontWeight={"bold"}
                            color="primary"
                          >
                            Change Image
                          </Typography>
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
            variant="contained"
            onClick={handleClose}
            color="inherit"
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            form="update-room"
            className="btn-action"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
