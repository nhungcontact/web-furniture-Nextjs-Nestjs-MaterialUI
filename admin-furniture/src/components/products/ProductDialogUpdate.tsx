/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useProductUpdate from "@/hooks/products/useProductUpdate";
import { GetProduct, ProductUpdateInput } from "@/types/product";
import { jsonForm } from "@/utils/form";
import "@mantine/tiptap/styles.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import RichTextEditor from "../shared/RichTextEditor";
import AutocompleteDialogCat from "./autocomplete/AutocompleteDialogCat";
import AutocompleteDialogRoom from "./autocomplete/AutocompleteDialogRoom";

type Props = {
  handleClose: () => void;
  open: boolean;
  data: GetProduct;
  onUpdate: (name?: boolean) => void;
};
export default function ProductDialogUpdate({
  handleClose,
  open,
  data,
  onUpdate,
}: Props) {
  const [room, setRoom] = useState("");
  const [cat, setCat] = useState("");
  const { trigger: updateProduct } = useProductUpdate(data._id);
  const [content, setContent] = useState(data && data.content ? data.content : "");
  const [description, setDescription] = useState(
    data && data.description ? data.description : "",
  );

  const handleGetRoom = (id: string) => {
    setRoom(id);
  };
  const handleGetCat = (id: string) => {
    setCat(id);
  };
  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleEditorChangeDes = (newContent: string) => {
    setDescription(newContent);
  };

  const handleUpdateProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    updateProduct({
      body: {
        ...json,
        content: content,
        description: description,
        roomFurniture: room ? room : data.roomFurniture._id,
        category: cat ? cat : data.category._id,
        isArrival: json.isArrival === "true" ? true : false,
      } as ProductUpdateInput,
    })
      .then(() => {
        alert("Update successfully!");
        handleClose();
        onUpdate(undefined);
      })
      .catch((e) => {
        alert(e?.message);
      });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"lg"}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <b>Update Product</b>
        </DialogTitle>
        <DialogContent
          sx={{ background: "#F8F8F8" }}
          dividers={true}
        >
          <form
            onSubmit={handleUpdateProduct}
            id="update-product"
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                mb={1}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  marginBottom={1}
                  color="black"
                  display={"inline-flex"}
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
                  defaultValue={data.name}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                  name="name"
                  placeholder="Enter a name"
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
                  display={"inline-flex"}
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
                  room={data.roomFurniture}
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
                  display={"inline-flex"}
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
                  cat={data.category}
                />
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
                <Box sx={{ background: "#FFFFFF" }}>
                  <RichTextEditor
                    value={description}
                    onChange={handleEditorChangeDes}
                  />
                </Box>
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
                  Content
                </Typography>
                <Box sx={{ background: "#FFFFFF" }}>
                  <RichTextEditor
                    value={content}
                    onChange={handleEditorChange}
                  />
                </Box>
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
                  New Arrival
                </Typography>
                <RadioGroup
                  row
                  defaultValue={data.isArrival}
                  name="isArrival"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </form>
          {/* </DialogContentText> */}
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
            form="update-product"
            className="btn-action"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
