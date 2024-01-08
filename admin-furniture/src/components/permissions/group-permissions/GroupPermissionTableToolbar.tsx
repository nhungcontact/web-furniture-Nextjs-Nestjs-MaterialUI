import SearchInput from "@/components/shared/SearchInput";
import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
} from "@mui/material";

interface GroupPermissionTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
}

export default function GroupPermissionTableToolbar(
  props: GroupPermissionTableToolbarProps,
) {
  const { getValueSearch, defaultValueSearch, onChangePageSize, valuePageSize } = props;
  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };
  //   const handleSearchByChange = (checked: boolean) => {
  //     getValueSearchByChange(checked);
  //   }
  const handleChangePageSize = (e: SelectChangeEvent<number>) => {
    onChangePageSize(e);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 0 },
        pr: { xs: 0, sm: 0 },
      }}
    >
      <Box sx={{ flex: "1 1 100%" }}>
        <SearchInput
          size="small"
          // disableUnderline
          placeholder="Search...."
          onValueChange={handleSearchChange}
          defaultValue={defaultValueSearch}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          sx={{
            height: "50px",
            width: "300px",
          }}
        />
      </Box>

      <Box className="display-sb">
        <Select
          // disableUnderline
          value={valuePageSize}
          onChange={handleChangePageSize}
          sx={{
            height: "50px",
            background: primary[50],
            color: primary[800],
            //   borderRadius: "15px",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            ":focus-visible": {
              outline: "none",
            },
          }}
        >
          {sort.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              sx={{ justifyContent: "flex-end" }}
            >
              Show {item.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Toolbar>
  );
}
