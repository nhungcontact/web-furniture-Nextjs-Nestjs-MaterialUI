import useOptionList from "@/hooks/options/useOptionList";

import { Option } from "@/types/option";
import { OptionValue } from "@/types/option-value";
import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import OptionDialogCreate from "../../options/OptionDialogCreate";
type Props = {
  setOption?: (value: string) => void;
  handleInputChange: (value: Option | OptionValue[], name: string, index: number) => void;
  index: number;
  val: Option | null;
};
const filter = createFilterOptions<Option>();

export default function AutocompleteDialogOption({
  setOption,
  handleInputChange,
  index,
  val,
}: Props) {
  const { data } = useOptionList({});
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState("");
  return (
    <>
      <Box>
        <Autocomplete
          fullWidth
          value={val}
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
              handleInputChange(newValue as Option, "optionSku", index);
              setOption?.(newValue?._id as string);
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
        <OptionDialogCreate
          handleClose={handleClose}
          open={open}
          dialogValue={dialogValue}
          title="Did you miss any option in our list? Please, add it!"
        />
      </Box>
    </>
  );
}
