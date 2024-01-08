/* eslint-disable @typescript-eslint/no-explicit-any */

import useGroupPermissionCreate from "@/hooks/group-permissions/useGroupPermissionCreate";
import useGroupPermissionUpdate from "@/hooks/group-permissions/useGroupPermissionUpdate";
import { GroupPermission } from "@/types/group-permission";
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

import { FormEvent } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: GroupPermission;
};
export default function GroupPermissionDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createGroupPermission } = useGroupPermissionCreate();
  const { trigger: updateGroupPermission } = useGroupPermissionUpdate(
    data ? data._id : "",
  );

  const handleSubmitGroupPermission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      updateGroupPermission({
        body: json as any,
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          handleClose();
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          handleClose();
        });
    } else {
      createGroupPermission({
        body: json as any,
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
      >
        <form
          onSubmit={handleSubmitGroupPermission}
          id="create-group-permission"
        >
          <DialogTitle>
            <b>Create Group Permission</b>
            {title && <DialogContentText mb={3}>{title}</DialogContentText>}
          </DialogTitle>
          <DialogContent sx={{ background: "#F8F8F8" }}>
            <Grid container>
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
                  sx={{ display: "inline-flex" }}
                >
                  Description
                </Typography>

                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data ? data.description : ""}
                  name="description"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Enter a description"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
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
              form="create-group-permission"
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
