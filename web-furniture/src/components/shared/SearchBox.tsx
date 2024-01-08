import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import { OutlinedInputProps } from "@mui/material";
import { neutral } from "@/config/theme";

interface SearchBoxProps extends OutlinedInputProps {
  styleColor?: string | undefined;
}

export default function SearchBox({ ...props }: SearchBoxProps) {
  return (
    <Box>
      <OutlinedInput
        multiline={props?.multiline}
        maxRows={props?.maxRows}
        onChange={props.onChange}
        type={props?.type}
        placeholder={props.placeholder}
        value={props.value}
        startAdornment={props?.startAdornment}
        endAdornment={props?.endAdornment}
        sx={{
          ...props.sx,
          color: `${props.styleColor ? props.styleColor : neutral[50]}`,
          "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${neutral[200]}`,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${neutral[50]}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${neutral[200]}`,
          },
          //   "& .MuiInputBase-input": {
          //     color: `${neutral[50]}`,
          //   },
        }}
      />
    </Box>
  );
}
