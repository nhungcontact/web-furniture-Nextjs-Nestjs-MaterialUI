/* eslint-disable @typescript-eslint/no-explicit-any */
import useOptionCreate from "@/hooks/options/useOptionCreate";
import useOptionUpdate from "@/hooks/options/useOptionUpdate";
import { DisplayOption, Option } from "@/types/option";
import { jsonForm } from "@/utils/form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { FormEvent, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  dialogValue?: any;
  title?: string;
  data?: Option;
};
export default function OptionDialogCreate({
  handleClose,
  open,
  dialogValue,
  title,
  data,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { trigger: createOption } = useOptionCreate();
  const { trigger: updateOption } = useOptionUpdate(data ? data._id : "");

  const [displayOption, setDisplayOption] = useState<DisplayOption>(
    data && data.displayOption ? data.displayOption : DisplayOption.OPTION_TEXT,
  );

  const handleChange = (event: SelectChangeEvent<DisplayOption>) => {
    setDisplayOption(event.target.value as DisplayOption);
  };

  const handleSubmitOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (data) {
      updateOption({
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
      createOption({
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
          onSubmit={handleSubmitOption}
          id="create-option"
        >
          <DialogTitle>
            <b>{data ? "Update" : "Create"} Option</b>
            {title && <DialogContentText>{title}</DialogContentText>}
          </DialogTitle>
          <DialogContent sx={{ background: "#F8F8F8" }}>
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
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Display Type
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="display-option-select"
                    id="demo-simple-select"
                    value={displayOption}
                    name="displayOption"
                    onChange={handleChange}
                    sx={{
                      "&.MuiOutlinedInput-root": {
                        background: "#FFFFFF",
                      },
                    }}
                  >
                    <MenuItem value={DisplayOption.OPTION_TEXT}>
                      {DisplayOption.OPTION_TEXT}
                    </MenuItem>
                    <MenuItem value={DisplayOption.OPTION_PHOTO}>
                      {DisplayOption.OPTION_PHOTO}
                    </MenuItem>
                  </Select>
                </FormControl>
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
              form="create-option"
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
