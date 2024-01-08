/* eslint-disable max-lines */
import RichTextEditor from "@/components/shared/RichTextEditor";
import useProductCreate from "@/hooks/products/useProductCreate";
import { ProductCreateInput } from "@/types/product";
import { jsonForm } from "@/utils/form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { FormEvent, useRef, useState } from "react";
import AutocompleteDialogCat from "../autocomplete/AutocompleteDialogCat";
import AutocompleteDialogRoom from "../autocomplete/AutocompleteDialogRoom";
type Props = {
  handleNext: () => void;
};
export default function CreateInformation({ handleNext }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [room, setRoom] = useState("");
  const [cat, setCat] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  const { trigger: createProduct } = useProductCreate();

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };
  const handleGetRoom = (id: string) => {
    setRoom(id);
  };
  const handleGetCat = (id: string) => {
    setCat(id);
  };

  const handleClearValue = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setContent("");
    setDescription("");
  };

  const handleEditorChangeDes = (newContent: string) => {
    setDescription(newContent);
  };
  const handleCreateProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    if (!json.name) {
      enqueueSnackbar("Please enter the product name!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (!description) {
      enqueueSnackbar("Please enter the product description!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (!content) {
      enqueueSnackbar("Please enter the product content!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (!cat) {
      enqueueSnackbar("Please select a category!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (!room) {
      enqueueSnackbar("Please select room furniture!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      createProduct({
        body: {
          ...json,
          content: content,
          description: description,
          roomFurniture: room,
          category: cat,
          isArrival: json.isArrival === "true" ? true : false,
          isHidden: json.isHidden === "true" ? true : false,
        } as ProductCreateInput,
      })
        .then((res) => {
          if (res) {
            localStorage.setItem("productId", res._id);
            enqueueSnackbar("Successful!", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            handleNext();
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

  return (
    <>
      <Card>
        <CardHeader
          title="Product Information"
          titleTypographyProps={{
            variant: "body1",
            fontWeight: "600",
            textTransform: "capitalize",
            ml: 3,
          }}
          style={{
            background: "#F8F8F8",
          }}
        />
        <Divider sx={{ margin: 0 }} />

        <form
          onSubmit={handleCreateProduct}
          id="create-product"
          ref={formRef}
        >
          <CardContent sx={{ paddingX: 5, paddingY: 3 }}>
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
                  color="black"
                  mb={1}
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
                <AutocompleteDialogRoom setRoom={handleGetRoom} />
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
                  mb={1}
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
                  mb={1}
                  sx={{ display: "inline-flex" }}
                >
                  New Arrival
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RadioGroup
                  row
                  defaultValue="true"
                  name="isArrival"
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
                sm={6}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  mb={1}
                  sx={{ display: "inline-flex" }}
                >
                  Hidden
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RadioGroup
                  row
                  name="isHidden"
                  defaultValue="false"
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
                  color="black"
                  mb={1}
                  sx={{ display: "inline-flex" }}
                >
                  Description
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RichTextEditor
                  value={description}
                  onChange={handleEditorChangeDes}
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
                  mb={1}
                >
                  Content
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RichTextEditor
                  value={content}
                  onChange={handleEditorChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Box
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"end"}
                >
                  <Button
                    className="btn-action"
                    color="primary"
                    variant="outlined"
                    onClick={handleClearValue}
                    sx={{ width: "100px", mr: 2 }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    className="btn-action"
                    //   onClick={handleNext}
                    sx={{ width: "100px" }}
                    type="submit"
                    form="create-product"
                  >
                    Create
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </>
  );
}
