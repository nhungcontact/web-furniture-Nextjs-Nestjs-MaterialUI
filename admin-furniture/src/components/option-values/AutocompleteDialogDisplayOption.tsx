import useDisplayOptionDetail from "@/hooks/display-types/useDisplayOptionDetail";
import useDisplayOptionList from "@/hooks/display-types/useDisplayOptionList";
import { DisplayOption } from "@/types/display-option";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DisplayOptionDialogCreate from "../display-options/DisplayOptionDialogCreate";
type Props = {
  handleSelectChange: (name: string, value: string) => void;
  option?: string;
};
const filter = createFilterOptions<DisplayOption>();

export default function AutocompleteDialogDisplayOption({
  handleSelectChange,
  option,
}: Props) {
  const [dialogValue, setDialogValue] = useState("");
  const { data: dataDetail } = useDisplayOptionDetail(option ? option : "");
  const { data } = useDisplayOptionList({});
  const [value, setValue] = useState<DisplayOption | null>(
    dataDetail ? dataDetail : null,
  );
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };
  return (
    <>
      <Autocomplete
        fullWidth
        value={value}
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
            handleSelectChange("optionSku", newValue?._id as string);
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
        options={data?.items && data?.items.length > 0 ? data?.items : []}
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
            placeholder="Select option"
            name="optionSku"
          />
        )}
      />
      <DisplayOptionDialogCreate
        handleClose={handleClose}
        open={open}
        dialogValue={dialogValue}
        title="Did you miss any option in our list? Please, add it!"
      />
    </>
  );
}
