import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import SearchBox from "./SearchBox";

interface TextFieldProps<T extends FieldValues> {
  label?: string;
  name: keyof T;
  control: Control<T>;
  rules?: object;
  error?: string | undefined;
  placeholder?: string;
  type?: string;
  style?: string;
  multiline?: boolean;
  maxRows?: number;
}

export default function TextField<T extends FieldValues>({
  type,
  name,
  control,
  rules,
  error,
  placeholder,
  style,
  multiline,
  maxRows,
}: TextFieldProps<T>) {
  return (
    <>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SearchBox
            multiline={multiline}
            maxRows={maxRows}
            type={type}
            onChange={field.onChange}
            placeholder={placeholder}
            value={field.value}
            error={Boolean(error)}
            styleColor={style}
            sx={{
              height: "48px",
              width: { xs: "20rem", sm: "30rem", md: "25rem", lg: "25rem" },
              padding: "12px 16px",
            }}
          />
        )}
      />
      {error && <FormHelperText sx={{ color: "error.main" }}>{error}</FormHelperText>}
    </>
  );
}
