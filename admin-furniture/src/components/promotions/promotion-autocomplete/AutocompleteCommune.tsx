import useCommuneList from "@/hooks/communes/useCommuneList";
import { Autocomplete, TextField } from "@mui/material";
type Props = {
  districtId: string;
};
export default function AutocompleteCommune({ districtId }: Props) {
  const { data: commune } = useCommuneList(districtId);
  return (
    <>
      {!!commune && !!commune.items && commune.items.length > 0 && (
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={commune.items.map((option) => option.name)}
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
