import useCommuneList from "@/hooks/communes/useCommuneList";
import { Commune } from "@/types/commune";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState, Fragment, useEffect } from "react";
type Props = {
  districtId: string;
  //   handleInputChange: (value: string, name: string) => void;
  data?: string;
};
export default function AutocompleteCommune({
  districtId,
  //   handleInputChange,
  data,
}: Props) {
  const [listCommune, setListCommune] = useState<Commune[]>([]);
  const { data: communes, isLoading: loading } = useCommuneList(districtId ?? "");
  const [value, setValue] = useState<Commune | null>(null);

  useEffect(() => {
    if (communes && communes.items && communes.items.length) {
      if (data) {
        const defaultValue = communes.items.filter((item) => item.name === data);
        const arr = communes.items.filter((item) => item.name !== data);
        setListCommune(arr);
        setValue(defaultValue[0]);
      } else {
        setListCommune(communes.items);
        setValue(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, communes]);
  return (
    <>
      <Autocomplete
        disabled={listCommune ? false : true}
        options={listCommune}
        value={value}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={(event, newValue) => {
          setValue(newValue);
          //   if (newValue) {
          //     handleInputChange(newValue.name, "commune");
          //   }
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            // label="Commune"
            name="commune"
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={20}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        )}
      />
    </>
  );
}
