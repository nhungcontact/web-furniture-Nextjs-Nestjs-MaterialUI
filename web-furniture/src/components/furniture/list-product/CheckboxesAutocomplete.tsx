import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Option } from "@/types/option";
import { OptionValue } from "@/types/option-value";
import Image from "next/image";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
type Props = {
  item: Option;
  handleInputChange: (option: string, value: OptionValue[]) => void;
};
export default function CheckboxesAutocomplete({ item, handleInputChange }: Props) {
  return (
    <Autocomplete
      componentsProps={{
        paper: {
          sx: {
            width: 300,
          },
        },
      }}
      size="small"
      multiple
      limitTags={0}
      id="checkboxes-tags-demo"
      options={
        item && item.optionValues && item.optionValues.length > 0 ? item.optionValues : []
      }
      onChange={(event, newValue) => {
        handleInputChange(item.name, newValue as OptionValue[]);
      }}
      //   value={val}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          <Image
            src={option.photo.imageURL ?? "/"}
            alt={option.photo.name ?? "-"}
            width={20}
            height={20}
            style={{ borderRadius: "50%", marginRight: "10px" }}
            unoptimized
          />
          {option.name}
        </li>
      )}
      //   style={{ width: "-webkit-fill-available" }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          //   label="Checkboxes"
          placeholder={item.name}
        />
      )}
    />
  );
}
