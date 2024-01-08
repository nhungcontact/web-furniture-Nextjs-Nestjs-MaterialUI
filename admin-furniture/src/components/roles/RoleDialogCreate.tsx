/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { FormEvent, useState } from "react";
// import AutocompleteDialogGroupRole from "./AutocompleteDialogRole";
import useRoleCreate from "@/hooks/roles/useRoleCreate";
import { GetRole, RoleCreateInput, RoleUpdateInput } from "@/types/role";
// import useRoleUpdate from "@/hooks/roles/useRoleUpdate";
import { jsonForm } from "@/utils/form";
import PermissionCheckboxTable from "./permission-checkbox/PermissionCheckboxTable";
import useRoleUpdate from "@/hooks/roles/useRoleUpdate";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: GetRole;
};
export default function RoleDialogCreate({ handleClose, open, title, data }: Props) {
  const [checkedAll, setCheckedAll] = useState<string[]>(
    data && data.permissions ? data.permissions.map((item) => item._id) : [],
  );
  const { trigger: createRole } = useRoleCreate();
  const { trigger: updateRole } = useRoleUpdate(data ? data._id : "");
  console.log(checkedAll);
  //   const { trigger: updateRole } = useRoleUpdate(data ? data._id : "");
  const handleSubmitRole = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      updateRole({
        body: {
          name: json.name,
          description: json.description as string,
          permissions: checkedAll,
        } as RoleUpdateInput,
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
      createRole({
        body: {
          name: json.name,
          description: json.description,
          permissions: checkedAll,
        } as RoleCreateInput,
      })
        .then(() => {
          handleClose();
          alert("That was easy!");
          // enqueueSnackbar("successfully", { variant: "success" });
        })
        .catch((e) => {
          alert(e?.message);
        });
    }
  };

  const handlePermissions = (item: string) => {
    const res = checkedAll.find((val) => val === item);
    if (res === undefined) {
      setCheckedAll([...checkedAll, item]);
    } else {
      setCheckedAll(checkedAll.filter((val) => val !== item));
    }
  };
  console.log(checkedAll);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <b> {data ? "Update" : "Create"} Role</b>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <form
            onSubmit={handleSubmitRole}
            id="create--Role"
          >
            <Grid container>
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
                  defaultValue={data ? data.name : ""}
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
                  Description
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
                  defaultValue={data ? data.description : ""}
                  name="description"
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
                my={2}
              >
                <PermissionCheckboxTable
                  disabled={false}
                  checkedAll={checkedAll}
                  setCheckedAll={(val) => setCheckedAll(val)}
                  handlePermissions={handlePermissions}
                  //   dataPermissions={data?.permissions}
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
            form="create--Role"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
