/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import usePermissionCreate from "@/hooks/permissions/usePermissionCreate";
import usePermissionUpdate from "@/hooks/permissions/usePermissionUpdate";
import {
  GetPermission,
  PermissionCreateInput,
  PermissionStatus,
} from "@/types/permission";
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
import { FormEvent, useRef, useState } from "react";
import AutocompleteDialogGroupPermission from "./AutocompleteDialogGroupPermission";
// import useUserMeGlobal from "@/hooks/useUserMeGlobal";
// import useUserInfor from "@/hooks/users/useUserInfor";
// import isValidRole from "@/helpers/isValidRole";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: GetPermission;
};
export default function PermissionDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [groupPermission, setGroupPermission] = useState(
    data ? data.groupPermission._id : "",
  );

  const { trigger: createPermission } = usePermissionCreate();
  const { trigger: updatePermission } = usePermissionUpdate(data ? data._id : "");
  const handleGetGroupPermission = (v: string) => {
    setGroupPermission(v);
  };
  const handleSubmitPermission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      updatePermission({
        body: {
          ...json,
          groupPermission: groupPermission,
        },
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
      createPermission({
        body: {
          ...json,
          groupPermission: groupPermission,
          status: PermissionStatus.Active,
        } as PermissionCreateInput,
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
          if (formRef.current) {
            formRef.current.reset();
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
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          <b>{data ? "Update" : "Create"} Permission</b>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmitPermission}
            id="create-permission"
          >
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
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Group Permission
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteDialogGroupPermission
                  setGroupPermission={handleGetGroupPermission}
                  data={data?.groupPermission}
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
                  Code
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  placeholder="CreateRole"
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data?.code}
                  name="code"
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
                  multiline
                  rows={3}
                  margin="dense"
                  id="name"
                  defaultValue={data ? data.description : ""}
                  name="description"
                  type="text"
                  variant="outlined"
                  placeholder="Enter a description"
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
            form="create-permission"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
