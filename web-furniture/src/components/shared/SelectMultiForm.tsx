import React from "react";
import { Control, Controller, FieldValues, Path, PathValue } from "react-hook-form";
import { FormHelperText, MenuItem, Select } from "@mui/material";
import { neutral } from "@/config/theme";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  options: SelectOption[] | undefined;
  control: Control<T>;
  rules?: object;
  error?: string | undefined;
  sx?: React.CSSProperties;
}

export default function SelectMultiForm<T extends FieldValues>({
  name,
  options,
  control,
  rules,
  error,
  sx,
}: SelectProps<T>) {
  return (
    <div>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Select
            sx={{
              ...sx,
              width: { xs: "20rem", sm: "30rem", md: "25rem", lg: "25rem" },
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${neutral[200]}`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${neutral[50]}`,
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${neutral[200]}`,
              },
            }}
            {...field}
            value={field.value || []} // Set default value to an empty array to handle undefined or null value
            onChange={(e) =>
              field.onChange(e.target.value as unknown as PathValue<T, Path<T>>)
            }
            multiple // Thêm thuộc tính multiple để cho phép chọn nhiều option
          >
            {options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText sx={{ color: "error.main" }}>{error}</FormHelperText>}
    </div>
  );
}
