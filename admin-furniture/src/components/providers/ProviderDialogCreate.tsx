/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */

import useProviderCreate from "@/hooks/providers/useProviderCreate";
import useProviderUpdate from "@/hooks/providers/useProviderUpdate";
import { Provider, ProviderCreateInput, ProviderUpdateInput } from "@/types/provider";
import { jsonForm } from "@/utils/form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { FormEvent, useState } from "react";
import AutocompleteCommune from "./autocomplete-address/AutocompleteCommune";
import AutocompleteDistrict from "./autocomplete-address/AutocompleteDistrict";
import AutocompleteProvince from "./autocomplete-address/AutocompleteProvince";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: Provider;
};
export default function ProviderDialogCreate({ handleClose, open, title, data }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createProvider } = useProviderCreate();
  const { trigger: updateProvider } = useProviderUpdate(data ? data._id : "");
  const [province, setProvince] = useState<string>(data ? data.address.province : "");
  const [district, setDistrict] = useState<string>(data ? data.address.district : "");
  const handleGetProvince = (v: string) => {
    setProvince(v);
  };
  const handleGetDistrict = (v: string) => {
    setDistrict(v);
  };
  const handleSubmitProvider = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    console.log(json);
    if (data) {
      updateProvider({
        body: {
          phoneNumber: json.phoneNumber,
          email: json.email,
          name: json.name,
          address: {
            province: json.province,
            district: json.district,
            commune: json.commune,
            addressDetail: json.addressDetail,
            isDefault: true,
          },
        } as ProviderUpdateInput,
      })
        .then(() => {
          handleClose();
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
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
      createProvider({
        body: {
          phoneNumber: json.phoneNumber,
          email: json.email,
          name: json.name,
          address: {
            province: json.province,
            district: json.district,
            commune: json.commune,
            addressDetail: json.addressDetail,
            isDefault: true,
          },
        } as ProviderCreateInput,
      })
        .then(() => {
          handleClose();
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <b>{data ? "Update" : "Create"} Provider</b>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <form
            onSubmit={handleSubmitProvider}
            id="create-Provider"
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
                  marginBottom={1}
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
                  defaultValue={data?.name}
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
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Email
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
                  defaultValue={data?.email}
                  name="email"
                  type="email"
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
                  Phone Number
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
                  defaultValue={data?.phoneNumber}
                  name="phoneNumber"
                  type="tel"
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
              >
                <Grid
                  container
                  columnSpacing={2}
                >
                  <Grid
                    item
                    xs={12}
                    md={4}
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
                      data={data?.address.province}
                      //   handleInputChange={handleInputChange}
                      getValue={handleGetProvince}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      marginBottom={1}
                      sx={{ display: "inline-flex" }}
                    >
                      District
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                    <AutocompleteDistrict
                      provinceId={province}
                      data={data?.address.district}
                      //   handleInputChange={handleInputChange}
                      //   data={}
                      getValue={handleGetDistrict}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      marginBottom={1}
                      sx={{ display: "inline-flex" }}
                    >
                      Commune
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                    <AutocompleteCommune
                      data={data?.address.commune}
                      districtId={district}
                      //   handleInputChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
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
                  Detail Address
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  margin="dense"
                  id="name"
                  defaultValue={data?.address.addressDetail}
                  placeholder="Enter a street, apartment number..."
                  name="addressDetail"
                  type="text"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
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
            form="create-Provider"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
