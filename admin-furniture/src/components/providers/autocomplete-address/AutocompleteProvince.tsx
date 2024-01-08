import useProvinceList from "@/hooks/provinces/useProvinceList";
import { Province } from "@/types/province";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
type Props = {
  getValue?: (value: string) => void;
  //   handleInputChange: (value: string, name: string) => void;
  data?: string;
};
export default function AutocompleteProvince({
  getValue,
  //   handleInputChange,
  data,
}: Props) {
  const [listProvince, setListProvince] = useState<Province[]>([]);
  const { data: provinces, isLoading: loading } = useProvinceList({});
  const [value, setValue] = useState<Province | null>(null);
  useEffect(() => {
    if (provinces && provinces.items && provinces.items.length) {
      if (data) {
        const defaultValue = provinces.items.filter((item) => item.name === data);
        const arr = provinces.items.filter((item) => item.name !== data);
        setListProvince(arr);
        setValue(defaultValue[0]);
        getValue?.(defaultValue[0].name);
      } else {
        setListProvince(provinces.items);
        setValue(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, provinces]);
  return (
    <>
      <Autocomplete
        options={listProvince}
        value={value}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) {
            getValue?.(newValue.name);
            // handleInputChange(newValue.name, "province");
          }
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            // label="Province"
            name="province"
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
