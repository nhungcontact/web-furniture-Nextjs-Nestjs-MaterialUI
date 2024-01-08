import useProvinceList from "@/hooks/provinces/useProvinceList";
import { Autocomplete, TextField } from "@mui/material";

export default function AutocompleteProvince() {
  const { data: provinces } = useProvinceList({});
  return (
    <>
      {!!provinces && !!provinces.items && provinces.items.length > 0 && (
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={provinces.items.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="freeSolo"
            />
          )}
        />
      )}
    </>
  );
}
