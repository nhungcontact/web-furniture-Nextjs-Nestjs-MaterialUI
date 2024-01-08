/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useCategoryCreate from "@/hooks/categories/useCategoryCreate";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { RoomFurniture } from "@/types/room-furniture";
import { jsonForm } from "@/utils/form";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { FormEvent, useEffect, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  room?: RoomFurniture;
};
export default function CategoryDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  room,
}: Props) {
  const { trigger: createCat } = useCategoryCreate();
  const { data: dataRoom } = useRoomFurnitureList({});
  const [listRoom, setListRoom] = useState<RoomFurniture[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [value, setValue] = useState<RoomFurniture[]>(room ? [room] : []);
  const { enqueueSnackbar } = useSnackbar();

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
  const handleSubmitCat = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    const json = jsonForm(e.currentTarget);
    const arr = value.map((item) => {
      return item._id;
    });
    const formData = new FormData();
    formData.append("name", json.name as string),
      formData.append("roomFurnitures", arr as any),
      formData.append("description", json.description as string),
      formData.append("photo", json.photo as string),
      createCat({
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
  useEffect(() => {
    if (dataRoom && dataRoom.items && dataRoom.items.length) {
      setListRoom(dataRoom.items);
      if (room) {
        const arr = dataRoom.items.filter((item) => item._id !== room._id);
        setListRoom(arr);
      }
    }
  }, [dataRoom, room]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          <b>Create Category</b>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          {/* {title && <DialogContentText mb={3}>{title}</DialogContentText>} */}
          <form
            onSubmit={handleSubmitCat}
            id="create-cat"
          >
            <Grid container>
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
                  Room Furniture
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  value={value}
                  options={listRoom}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  // defaultValue={[dataRoom?.items[0]]}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="roomFurnitures"
                      margin="dense"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                  )}
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
                  name="description"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={2}
                  placeholder="Enter a description room"
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
            form="create-cat"
            className="btn-action"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
