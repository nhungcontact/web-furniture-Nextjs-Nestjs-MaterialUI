import OptionDialogCreate from "@/components/options/OptionDialogCreate";
import useOptionDetail from "@/hooks/options/useOptionDetail";
import useOptionList from "@/hooks/options/useOptionList";

import { Option } from "@/types/option";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
type Props = {
  handleSelectChange: (name: string, value: string, index: number) => void;
  option?: string;
  index: number;
};
const filter = createFilterOptions<Option>();

export default function AutocompleteDialogOption({
  handleSelectChange,
  option,
  index,
}: Props) {
  const { data: dataOption } = useOptionDetail(option);
  const [listOption, setListOption] = useState<Option[]>([]);

  const [dialogValue, setDialogValue] = useState("");
  const { data: options } = useOptionList({});
  const [value, setValue] = useState<Option | null>(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };
  useEffect(() => {
    if (options && options.items && options.items.length) {
      if (dataOption) {
        const defaultValue = options.items.filter((item) => item._id === dataOption._id);
        const arr = options.items.filter((item) => item._id !== dataOption._id);
        setListOption(arr);
        setValue(defaultValue[0]);
      } else {
        setListOption(options.items);
        setValue(null);
      }
    }
  }, [options, dataOption]);

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
            handleSelectChange("optionSku", newValue?._id as string, index);
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
        options={listOption}
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
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        )}
      />
      <OptionDialogCreate
        handleClose={handleClose}
        open={open}
        dialogValue={dialogValue}
        title="Did you miss any option in our list? Please, add it!"
      />
    </>
  );
}
