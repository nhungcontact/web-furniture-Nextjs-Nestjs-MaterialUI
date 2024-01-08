import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { BillStatus } from "@/types/bill";
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

interface BillTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  handleChange: (event: SelectChangeEvent<BillStatus | string>) => void;
  status?: BillStatus | string;
}

export default function BillTableToolbar(props: BillTableToolbarProps) {
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
            value={status ? status : ("All" as string)}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={"All"}>All Order</MenuItem>
            <MenuItem value={BillStatus.Waiting}>{BillStatus.Waiting}</MenuItem>
            <MenuItem value={"true"}>Request cancel</MenuItem>
            <MenuItem value={BillStatus.Processing}>{BillStatus.Processing}</MenuItem>
            <MenuItem value={BillStatus.Shipping}>{BillStatus.Shipping}</MenuItem>
            <MenuItem value={BillStatus.Success}>{BillStatus.Success}</MenuItem>
            <MenuItem value={BillStatus.Cancel}>{BillStatus.Cancel}</MenuItem>
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
