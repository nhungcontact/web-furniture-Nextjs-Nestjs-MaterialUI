import useGroupPermissionList from "@/hooks/group-permissions/useGroupPermissionList";
import { GroupPermission } from "@/types/group-permission";
import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import GroupPermissionDialogCreate from "./group-permissions/GroupPermissionDialogCreate";
type Props = {
  setGroupPermission: (value: string) => void;
  data?: GroupPermission;
};
const filter = createFilterOptions<GroupPermission>();

export default function AutocompleteDialogGroupPermission({
  setGroupPermission,
  data,
}: Props) {
  const { data: listGroup } = useGroupPermissionList({});
  const [dialogValue, setDialogValue] = useState("");
  const [value, setValue] = useState<GroupPermission | null>(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  return (
    <>
      <Box>
        <Autocomplete
          fullWidth
          value={data ? data : value}
          //   defaultValue={data ? data : null}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue(newValue);
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue(newValue.inputValue);
            } else {
              setGroupPermission(newValue?._id as string);
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={listGroup?.items ? listGroup?.items : []}
          getOptionLabel={(option) => {
            // e.g. value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          // sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Group Permission"
              name="groupPermission"
            />
          )}
        />
        <GroupPermissionDialogCreate
          handleClose={handleClose}
          open={open}
          dialogValue={dialogValue}
          //   title="Did you miss any brand in our list? Please, add it!"
        />
      </Box>
      {/* )} */}
    </>
  );
}
