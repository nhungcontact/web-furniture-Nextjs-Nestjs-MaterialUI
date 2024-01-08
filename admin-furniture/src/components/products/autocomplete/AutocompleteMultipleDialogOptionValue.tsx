import useOptionDetail from "@/hooks/options/useOptionDetail";
import { Option } from "@/types/option";
import { OptionValue } from "@/types/option-value";
import { ControlPointRounded } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import OptionValueDialogCreate from "../../option-values/OptionValueDialogCreate";

type Props = {
  optionID: string | null;
  handleInputChange: (value: Option | OptionValue[], name: string, index: number) => void;
  index: number;
  val: OptionValue[];
};

export default function AutocompleteMultipleDialogOptionValue({
  optionID,
  handleInputChange,
  index,
  val,
}: Props) {
  const { data: dataOptionDetail } = useOptionDetail(
    optionID ? (optionID as string) : "",
  );
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };
  const handleCreateDialog = () => {
    toggleOpen(true);
  };
  return (
    <>
      <Box display="flex">
        <Autocomplete
          fullWidth
          multiple
          id="tags-outlined"
          options={
            dataOptionDetail && dataOptionDetail?.optionValues
              ? dataOptionDetail?.optionValues
              : []
          }
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) => {
            handleInputChange(newValue as OptionValue[], "optionValues", index);
          }}
          value={val}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select multiple value"
              name="optionValues"
            />
          )}
        />

        {/* <Button
          title="Createvalue"
          size="small"
          color="primary"
          onClick={handleCreateDialog}
          startIcon={}
        ></Button> */}
        <IconButton
          onClick={handleCreateDialog}
          title="CreateValue"
          color="primary"
        >
          <ControlPointRounded sx={{ fontSize: "26px!important" }} />
        </IconButton>
        <OptionValueDialogCreate
          handleClose={handleClose}
          open={open}
          option={dataOptionDetail}
        />
      </Box>
    </>
  );
}
