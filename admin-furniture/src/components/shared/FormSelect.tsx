// import useFP from "@/hooks/subjects/useFP";
// import { FormSelectProps } from "@/types/react-hook-form.type";
import { FormSelectProps } from "@/types/react-hook-form";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  control,
  label,
  isLoading,
  data,
  error,
  mode,
  onSelectedValue,
  onScroll,
  errorsForm,
}) => {
  //   const { subjectList } = useFP();
  return (
    <FormControl
      size={"medium"}
      sx={{ width: "100%" }}
      error={!!errorsForm || !!error}
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Select
                MenuProps={{
                  PaperProps: onScroll && {
                    sx: { maxHeight: 300 },
                    onScroll,
                  },
                }}
                onChange={(e) => {
                  onChange(e);
                  if (onSelectedValue) {
                    if (name === "subjectId") {
                      const subjectSelected = data?.find(
                        (item) => item.id === (e.target.value as number),
                      );
                      if (subjectSelected) {
                        onSelectedValue(subjectSelected);
                      }
                    } else {
                      onSelectedValue(e.target.value);
                    }
                  }
                }}
                value={value}
                disabled={["Approved", "reject", "request-unlock"].includes(mode)}
                variant={
                  ["Approved", "reject", "request-unlock"].includes(mode)
                    ? "standard"
                    : "outlined"
                }
                sx={{
                  "& .Mui-disabled": {
                    color: "black",
                  },
                  "& .MuiSelect-select MuiSelect-standard Mui-disabled MuiInputBase-input MuiInput-input Mui-disabled":
                    {
                      color: "black",
                    },
                }}
              >
                {isLoading && (
                  <MenuItem>
                    <CircularProgress />
                  </MenuItem>
                )}
                {error && (
                  <MenuItem>
                    <Alert severity="error">{error.message}</Alert>
                  </MenuItem>
                )}
                {!data && <MenuItem>No data...</MenuItem>}
                {data?.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                    // disabled={
                    //   ["subjectId"].includes(name)
                    //     ? !!subjectList.find((s) => s.id === item.id)
                    //     : false
                    // }
                  >
                    {name === "termId" &&
                      `${item?.startYear ?? "-"} - ${item?.endYear ?? "-"}`}
                    {["majorId", "subjectId", "eduSystemId"].includes(name) && item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "error.main" }}>
                {error ? error.message : null}
              </FormHelperText>
            </>
          );
        }}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
