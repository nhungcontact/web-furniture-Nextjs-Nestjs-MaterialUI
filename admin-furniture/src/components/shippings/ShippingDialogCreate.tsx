/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jsonForm } from "@/utils/form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import useShippingCreate from "@/hooks/shippings/useShippingCreate";
import useShippingUpdate from "@/hooks/shippings/useShippingUpdate";
import {
  Shipping,
  ShippingCreateInput,
  ShippingStatus,
  ShippingUpdateInput,
} from "@/types/shipping";
import { FormEvent, useState } from "react";
import AutocompleteProvince from "../providers/autocomplete-address/AutocompleteProvince";
type Props = {
  handleClose: () => void;
  open: boolean;
  title?: string;
  data?: Shipping;
};
export default function ShippingDialogCreate({ handleClose, open, title, data }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createShipping } = useShippingCreate();
  const { trigger: updateShipping } = useShippingUpdate(data ? data._id : "");
  const [province, setProvince] = useState<string>(data ? data.provinceApply : "");

  const handleInputChange = (data: string) => {
    setProvince(data);
  };
  const handleSubmitShipping = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (province) {
      if (data) {
        updateShipping({
          body: {
            price: Number(json.price) as number,
            status: json.status as ShippingStatus,
            provinceApply: province as string,
          } as ShippingUpdateInput,
        })
          .then(() => {
            handleClose();
            alert("successfully");
            // enqueueSnackbar("successfully", { variant: "success" });
          })
          .catch((e) => {
            alert(e?.message);
          });
      } else {
        createShipping({
          body: {
            price: Number(json.price) as number,
            status: json.status as ShippingStatus,
            provinceApply: province as string,
          } as ShippingCreateInput,
        })
          .then(() => {
            handleClose();
            enqueueSnackbar("That was easy!");
            // enqueueSnackbar("successfully", { variant: "success" });
          })
          .catch((e) => {
            enqueueSnackbar(e?.message, { variant: "error" });
          });
      }
    } else {
      alert("Please choose a province!");
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll={"paper"}
      >
        <form
          onSubmit={handleSubmitShipping}
          id="create-Provider"
        >
          <DialogTitle>
            <b>Create Shipping</b>
            {title && <DialogContentText mb={3}>{title}</DialogContentText>}
          </DialogTitle>
          <DialogContent sx={{ background: "#F8F8F8" }}>
            <Grid
              container
              py={2}
            >
              <Grid
                item
                xs={12}
                my={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
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
                  margin="dense"
                  id="name"
                  defaultValue={data?.price}
                  //   label="Name"
                  name="price"
                  type="number"
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
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Province
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteProvince
                  getValue={handleInputChange}
                  data={data?.provinceApply}
                />
              </Grid>

              <Grid
                item
                xs={12}
                mb={2}
              >
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
                  name="status"
                  defaultValue={data ? data.status : ShippingStatus.Active}
                >
                  <FormControlLabel
                    value={ShippingStatus.Active}
                    control={<Radio />}
                    label={ShippingStatus.Active}
                  />
                  <FormControlLabel
                    value={ShippingStatus.Inactive}
                    control={<Radio />}
                    label={ShippingStatus.Inactive}
                  />
                </RadioGroup>
              </Grid>
            </Grid>
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
              form="create-Provider"
              className="btn-action"
            >
              {data ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
