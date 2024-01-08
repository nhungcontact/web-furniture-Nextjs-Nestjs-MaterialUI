/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useCategoryUpdate from "@/hooks/categories/useCategoryUpdate";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { GetCategory } from "@/types/category";
import { RoomFurniture } from "@/types/room-furniture";
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
import { FormEvent, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: GetCategory;
};
export default function CategoryDialogUpdate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const { trigger: updateCat } = useCategoryUpdate(data?._id as string);
  const { data: dataRoom } = useRoomFurnitureList({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [roomID, setRoomID] = useState<RoomFurniture[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      setSelectedImage(files[0]);
    }
  };
  const filterByReference = (arr1: any, arr2: any) => {
    let res = [];
    res = arr1.filter((el: RoomFurniture) => {
      return arr2.find((element: RoomFurniture) => {
        return element._id === el._id;
      });
    });
    return res;
  };
  const handleClearImage = () => {
    setSelectedImage(null);
  };
  const handleUpdateCat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    let arr = [] as any;

    if (roomID.length) {
      arr = roomID.map((item) => {
        return item._id;
      });
    } else if (data && data.roomFurnitures) {
      arr = data.roomFurnitures.map((item) => {
        return item._id;
      });
    }
    if (arr) {
      const formData = new FormData();
      formData.append("name", json.name as string);
      formData.append("roomFurnitures", arr as any);
      formData.append("description", json.description as string);
      formData.append("photo", selectedImage ? selectedImage : (json.photo as string));
      updateCat({
        body: formData as any,
      })
        .then(() => {
          handleClose();
          enqueueSnackbar("successfully", { variant: "success" });
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, { variant: "error" });
        });
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          <b>Update Category</b>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
          <form
            onSubmit={handleUpdateCat}
            id="update-cat"
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
                  defaultValue={data && data.name ? data.name : dialogValue}
                  //   label="Name"
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
                {dataRoom && dataRoom.total !== 0 && (
                  <Autocomplete
                    limitTags={3}
                    multiple
                    id="tags-outlined"
                    options={dataRoom?.items}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      setRoomID(newValue);
                    }}
                    defaultValue={filterByReference(
                      data?.roomFurnitures,
                      dataRoom?.items,
                    )}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Room Furniture"
                        placeholder="Room Furniture"
                        name="roomFurnitures"
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
                  defaultValue={data && data?.description}
                  name="description"
                  //   label="Description"
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
                    background: "#fff",
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
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            form="update-cat"
            className="btn-action"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
