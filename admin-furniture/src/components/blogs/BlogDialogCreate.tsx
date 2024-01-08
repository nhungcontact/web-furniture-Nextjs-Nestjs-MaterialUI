/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines */
import useBlogCreate from "@/hooks/blogs/useBlogCreate";
import useBlogUpdate from "@/hooks/blogs/useBlogUpdate";
import { GetBlog } from "@/types/blog";
import { jsonForm } from "@/utils/form";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FormEvent, useEffect, useRef, useState } from "react";
import AutocompleteDialogCat from "../products/autocomplete/AutocompleteDialogCat";
import AutocompleteDialogRoom from "../products/autocomplete/AutocompleteDialogRoom";
import RichTextEditor from "../shared/RichTextEditor";
import getUser from "@/utils/getUser";
import { User } from "@/types/user";

type Props = {
  handleClose: () => void;
  open: boolean;
  data?: GetBlog;
};
export default function BlogDialogCreate({ handleClose, open, data }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [room, setRoom] = useState("");
  const [cat, setCat] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [updateData, setUpdateData] = useState<GetBlog>();
  const { trigger: createBlog } = useBlogCreate();
  const { trigger: updateBlog } = useBlogUpdate(
    updateData && updateData._id ? updateData._id : "",
  );
  const [content, setContent] = useState(data && data.content ? data.content : "");

  const handleGetRoom = (id: string) => {
    setRoom(id);
  };
  const handleGetCat = (id: string) => {
    setCat(id);
  };

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

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

  const handleCreateBlog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);

    console.log(json.photo);

    const formData = new FormData();
    formData.append("user", getUser() ? (getUser() as User)._id : "");
    formData.append("name", json.name as string);
    formData.append("actor", json.actor as string);
    formData.append("description", json.description as string);
    formData.append("content", content as string);
    formData.append("roomFurniture", room as string);
    formData.append("category", cat as string);
    formData.append("isNew", json.isNew === "true" ? (true as any) : (false as any));
    formData.append("photo", selectedImage ? selectedImage : (json.photo as string));

    if (updateData && updateData._id) {
      updateBlog({
        body: formData as any,
      })
        .then(() => {
          enqueueSnackbar("update successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          handleClose();
          if (formRef.current) {
            formRef.current.reset();
            setSelectedImage(null);
          }
          router.push("/blogs");
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    } else {
      createBlog({
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
          if (formRef.current) {
            formRef.current.reset();
            setSelectedImage(null);
          }
          handleClose();
          router.push("/blogs");
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
    if (data) {
      setUpdateData(data);
    }
  }, [data]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <b>{data ? "Update" : "Create"} Blog</b>
        </DialogTitle>
        <DialogContent
          sx={{ background: "#F8F8F8" }}
          dividers={true}
        >
          <form
            onSubmit={handleCreateBlog}
            id="submit-blog"
            ref={formRef}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
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
                  defaultValue={updateData?.name}
                  name="name"
                  placeholder="Enter a name"
                  margin="dense"
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
                sm={6}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Room
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteDialogRoom
                  setRoom={handleGetRoom}
                  room={updateData?.roomFurniture}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Category
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteDialogCat
                  setCat={handleGetCat}
                  roomID={room}
                  cat={updateData?.category}
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
                  sx={{ display: "inline-flex" }}
                >
                  Actor
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={updateData?.actor}
                  name="actor"
                  placeholder="Enter a Actor"
                  margin="dense"
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
                sm={6}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  marginBottom={1}
                  color="black"
                >
                  New
                </Typography>
                <RadioGroup
                  row
                  defaultValue={updateData?.isNew ?? true}
                  name="isNew"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  marginBottom={1}
                  color="black"
                >
                  Description
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={updateData?.description}
                  name="description"
                  multiline
                  rows={5}
                  placeholder="Enter a description"
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
                  sx={{ display: "inline-flex" }}
                >
                  Photos
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
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Content
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <Box sx={{ background: "#FFFFFF", mt: 1 }}>
                  <RichTextEditor
                    value={content}
                    onChange={handleEditorChange}
                  />
                </Box>
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
            form="submit-blog"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
