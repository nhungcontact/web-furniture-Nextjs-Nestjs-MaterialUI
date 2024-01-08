import SelectWithoutLabel from "@/components/shared/SelectWithoutLabel";
import { primary } from "@/config/theme";
import { Box, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";

export default function SortProduct() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setAge(event.target.value as string);
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
    >
      <Typography
        variant="body1"
        marginRight={2}
        fontWeight={"600"}
      >
        Sort by:{" "}
      </Typography>
      <Box>
        <SelectWithoutLabel
          displayEmpty
          value={age}
          onChange={handleChange}
          sx={{
            "& .MuiOutlinedInput-input": {
              color: "black",
              padding: "5px 10px",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "green",
            },
            "&:hover .MuiOutlinedInput-input": {
              color: "black",
            },
            "&:hover .MuiInputLabel-root": {
              color: "red",
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: `${primary[400]}`,
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
              color: "purple",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "purple",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: `${primary[400]}`,
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectWithoutLabel>
      </Box>
    </Box>
  );
}
