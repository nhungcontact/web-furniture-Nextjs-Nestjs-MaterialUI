import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { neutral } from "@/config/theme";

const selectedColor = "linear-gradient(180deg, #F24B26 0%, #FFAE35 100%)";
const normalColor = "black";

interface DropDownSignupProps {
  onRoleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export default function DropDownSignup({ onRoleChange }: DropDownSignupProps) {
  const [selectedItem, setSelectedItem] = React.useState("MEMBER"); // Vai trò mặc định là MEMBER
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedItem(event.target.value);
    onRoleChange(event as React.ChangeEvent<{ value: unknown }>);
  };

  const handleOpenDropDown = () => {
    setIsDropDownOpen(true);
  };

  const handleCloseDropDown = () => {
    setIsDropDownOpen(false);
  };

  return (
    <Grid
      item
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Box>
        <FormControl
          fullWidth
          style={{ color: "white" }}
          color="neutral"
          sx={{
            minWidth: { xs: 320, sm: 480, md: 400 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: `2px solid ${neutral[200]}`,
              },
              "&:hover fieldset": {
                border: `2px solid ${neutral[50]}`,
              },
              "&.Mui-focused fieldset": {
                border: `2px solid ${neutral[200]}`,
              },
              "& .MuiInputBase-input": {
                color: `${neutral[50]}`,
              },
            },
          }}
        >
          <Select
            IconComponent={KeyboardArrowDownIcon}
            value={selectedItem}
            onChange={handleChange}
            open={isDropDownOpen}
            onOpen={handleOpenDropDown}
            onClose={handleCloseDropDown}
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              height: "40px",
            }}
          >
            <MenuItem
              value="MEMBER"
              style={{
                backgroundImage: selectedItem === "MEMBER" ? selectedColor : "none",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: selectedItem === "MEMBER" ? "transparent" : normalColor,
              }}
            >
              MEMBER
            </MenuItem>
            <MenuItem
              value="OWNER"
              style={{
                backgroundImage: selectedItem === "OWNER" ? selectedColor : "none",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: selectedItem === "OWNER" ? "transparent" : normalColor,
              }}
            >
              OWNER
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
}
