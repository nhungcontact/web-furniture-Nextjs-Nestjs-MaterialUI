import OptionValueDialogCreate from "@/components/option-values/OptionValueDialogCreate";
import useOptionValueDetail from "@/hooks/option-values/useOptionValueDetail";
import useOptionDetail from "@/hooks/options/useOptionDetail";

import { OptionValue } from "@/types/option-value";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Variant } from "./ProductDetailDialogUpdate";

type Props = {
  handleSelectChange: (name: string, value: string, index: number) => void;
  variant: Variant;
  index: number;
};
const filter = createFilterOptions<OptionValue>();

export default function AutocompleteDialogOptionValue({
  handleSelectChange,
  variant,
  index,
}: Props) {
  const { data: dataOptionValue } = useOptionValueDetail(variant.optionValue);
  const [listOptionValue, setListOptionValue] = useState<OptionValue[]>([]);

  const { data: dataOptionDetail } = useOptionDetail(
    dataOptionValue?.optionSku._id
      ? (dataOptionValue?.optionSku._id as string)
      : variant.optionSku,
  );
  const [dialogValue, setDialogValue] = useState("");
  const [value, setValue] = useState<OptionValue | null>(null);

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };
  useEffect(() => {
    if (
      dataOptionDetail &&
      dataOptionDetail.optionValues &&
      dataOptionDetail.optionValues.length
    ) {
      if (variant) {
        const defaultValue = dataOptionDetail.optionValues.filter(
          (item) => item._id === variant.optionValue,
        );
        const arr = dataOptionDetail.optionValues.filter(
          (item) => item._id !== variant.optionValue,
        );
        setListOptionValue(arr);
        setValue(defaultValue[0]);
      } else {
        setListOptionValue(dataOptionDetail.optionValues);
        setValue(null);
      }
    }
  }, [dataOptionDetail, variant]);

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
            handleSelectChange("optionValue", newValue?._id as string, index);
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
        options={listOptionValue}
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
            placeholder="Select option value"
            name="optionSku"
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        )}
      />
      <OptionValueDialogCreate
        handleClose={handleClose}
        open={open}
        dialogValue={dialogValue}
        title="Did you miss any option in our list? Please, add it!"
        option={dataOptionDetail}
      />
    </>
  );
}
