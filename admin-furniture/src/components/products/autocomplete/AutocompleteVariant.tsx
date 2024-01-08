import { SkuValueData } from "@/types/sku-value";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

type Props = {
  data: SkuValueData[];
  handleGetVariant: (value: SkuValueData, index: number) => void;
  isCreate: boolean;
  index: number;
};

export default function AutocompleteVariant({
  data,
  handleGetVariant,
  isCreate,
  index,
}: Props) {
  const [value, setValue] = useState<SkuValueData | null>(null);
  useEffect(() => {
    if (isCreate) {
      setValue(null);
    }
  }, [isCreate]);
  return (
    <>
      <Box sx={{ my: 2 }}>
        <Autocomplete
          value={value}
          disablePortal
          id="combo-box-demo"
          options={data}
          onChange={(event, newValue) => {
            handleGetVariant(newValue as SkuValueData, index);
            setValue(newValue as SkuValueData);
          }}
          getOptionLabel={(option) =>
            option.optionSku.name + "/" + option.optionValue.name
          }
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Variant"
            />
          )}
        />
      </Box>
    </>
  );
}
