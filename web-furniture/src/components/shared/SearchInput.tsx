import useDebounce from "@/hooks/shared/useDebounce";
import { InputProps, OutlinedInput } from "@mui/material";
import { useEffect, useRef } from "react";

type SearchInputProps = {
  onValueChange: (value?: string) => void;
};

function SearchInput({
  onValueChange,
  ...props
}: Pick<
  InputProps,
  | "size"
  //   | "disableUnderline"
  | "disabled"
  | "placeholder"
  | "sx"
  | "id"
  | "name"
  | "inputProps"
  | "defaultValue"
  | "startAdornment"
  | "fullWidth"
  | "autoFocus"
  | "className"
  | "endAdornment"
> &
  SearchInputProps) {
  const isMounted = useRef(false);
  const [value, setValue] = useDebounce<string>({
    initialValue: props.defaultValue as string,
  });

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    onValueChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <OutlinedInput
      {...props}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default SearchInput;
