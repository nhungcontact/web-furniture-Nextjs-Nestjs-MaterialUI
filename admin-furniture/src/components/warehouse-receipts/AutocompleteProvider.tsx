import useProviderList from "@/hooks/providers/useProviderList";
import { Autocomplete, TextField } from "@mui/material";

export default function AutocompleteProvider() {
  const { data } = useProviderList({});
  return (
    <Autocomplete
      fullWidth
      //   value={value}
      disablePortal
      id="combo-box-demo"
      options={data && data.items ? data.items : []}
      //   onChange={(event, newValue) => {
      //     handleGetVariant(newValue as SkuValueData, index);
      //     setValue(newValue as SkuValueData);
      //   }}
      getOptionLabel={(option) => option.email}
      renderInput={(params) => (
        <TextField
          {...params}
          name="provider"
          fullWidth
          placeholder="Select a provider"
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "#FFFFFF",
            },
          }}
        />
      )}
    />
  );
}
