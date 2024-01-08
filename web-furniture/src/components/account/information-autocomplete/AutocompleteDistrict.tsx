import useDistrictDetail from "@/hooks/districts/useDistrictDetail";
import useDistrictList from "@/hooks/districts/useDistrictList";
import { District } from "@/types/district";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
type Props = {
  provinceId: string;
  getValue: (value: string) => void;
  handleInputChange: (value: string, name: string, index: number) => void;
  index: number;
  data?: string;
  isUpdate: boolean;
};
export default function AutocompleteDistrict({
  provinceId,
  getValue,
  handleInputChange,
  index,
  data,
  isUpdate,
}: Props) {
  console.log(provinceId);
  const [listDistrict, setListDistrict] = useState<District[]>([]);
  const { data: districts, isLoading: loading } = useDistrictList(provinceId);
  const [value, setValue] = useState<District | null>(null);
  useEffect(() => {
    if (districts && districts.items && districts.items.length) {
      if (data) {
        const defaultValue = districts.items.filter((item) => item.name === data);
        const arr = districts.items.filter((item) => item.name !== data);
        setListDistrict(arr);
        setValue(defaultValue[0]);
        getValue(defaultValue[0]._id);
      } else {
        setListDistrict(districts.items);
        setValue(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, districts]);
  return (
    <>
      <Autocomplete
        readOnly={!isUpdate}
        disabled={listDistrict ? false : true}
        options={listDistrict}
        value={value}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue) {
            getValue(newValue._id);
            handleInputChange(newValue.name, "district", index);
          }
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
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
            size="small"
          />
        )}
      />
    </>
  );
}
