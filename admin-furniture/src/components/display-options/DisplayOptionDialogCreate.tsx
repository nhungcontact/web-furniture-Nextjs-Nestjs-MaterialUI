/* eslint-disable @typescript-eslint/no-explicit-any */
import useDisplayOptionCreate from "@/hooks/display-types/useDisplayOptionCreate";
import useDisplayOptionUpdate from "@/hooks/display-types/useDisplayOptionUpdate";
import { DisplayOption } from "@/types/display-option";
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
} from "@mui/material";
import { useSnackbar } from "notistack";

import { FormEvent } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: DisplayOption;
};
export default function DisplayOptionDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createDisplayOption } = useDisplayOptionCreate();
  const { trigger: updateDisplayOption } = useDisplayOptionUpdate(data ? data._id : "");

  const handleSubmitDisplayOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      updateDisplayOption({
        body: json as any,
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
      createDisplayOption({
        body: json as any,
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
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <form
          onSubmit={handleSubmitDisplayOption}
          id="create-display-option"
        >
          <DialogTitle>
            <b>Create Display Option</b>
          </DialogTitle>
          <DialogContent>
            {title && <DialogContentText mb={3}>{title}</DialogContentText>}
            <Grid container>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data ? data.name : dialogValue}
                  label="Name"
                  name="name"
                  type="text"
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <TextField
                  fullWidth
                  margin="dense"
                  id="name"
                  defaultValue={data ? data.name : ""}
                  label="Description"
                  name="description"
                  type="text"
                  variant="outlined"
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
              form="create-display-option"
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
