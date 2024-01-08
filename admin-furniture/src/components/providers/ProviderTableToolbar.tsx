import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
} from "@mui/material";
import SearchInput from "../shared/SearchInput";
import { ProviderStatus } from "@/types/provider";

interface ProviderTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;

  handleChange: (event: SelectChangeEvent<ProviderStatus>) => void;
  status?: ProviderStatus;
}

export default function ProviderTableToolbar(props: ProviderTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    handleChange,
    status,
  } = props;
  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };
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
        <FormControl sx={{ marginLeft: 2 }}>
          <Select
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
            id="demo-simple-select"
            value={status ? status : ProviderStatus.Active}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={ProviderStatus.Active}>{ProviderStatus.Active}</MenuItem>
            <MenuItem value={ProviderStatus.Inactive}>{ProviderStatus.Inactive}</MenuItem>
          </Select>
        </FormControl>
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
