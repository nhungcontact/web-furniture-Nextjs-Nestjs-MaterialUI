import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { InputAdornment, FormHelperText } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SearchBox from './SearchBox';

interface TextFieldProps<T extends FieldValues> {
  label?: string;
  name: keyof T;
  control: Control<T>;
  rules?: object;
  error?: string | undefined;
  placeholder?: string
}

export default function TextField<T extends FieldValues>({ name, control, rules, error, placeholder }: TextFieldProps<T>) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field }) => (
          <SearchBox
            onChange={field.onChange}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={field.value}
            error={Boolean(error)}
            sx={{
              height: "48px",
              width: { xs: "20rem", sm: "30rem", md: "25rem", lg: "25rem" },
              padding: "12px 16px",
            }}
            endAdornment={
              <InputAdornment
                position="end"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <Visibility
                    cursor={"pointer"}
                    sx={{ color: "white" }}
                  />
                ) : (
                  <VisibilityOff
                    cursor={"pointer"}
                    sx={{ color: "white" }}
                  />
                )}
              </InputAdornment>
            }
          />
        )}
      />
      {error && (
        <FormHelperText sx={{ color: "error.main" }}>
          {error}
        </FormHelperText>
      )}
      {/* {error && <p>{error}</p>} */}
    </div>
  );
}
