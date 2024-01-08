import useDistrictList from "@/hooks/districts/useDistrictList";
import { Autocomplete, TextField } from "@mui/material";
type Props = {
  provinceId: string;
};
export default function AutocompleteDistrict({ provinceId }: Props) {
  const { data: districts } = useDistrictList(provinceId);
  return (
    <>
      {!!districts && !!districts.items && districts.items.length > 0 && (
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={districts.items.map((option) => option.name)}
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
