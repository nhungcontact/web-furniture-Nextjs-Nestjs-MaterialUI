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
import useCategoryList from "@/hooks/categories/useCategoryList";
import { CategoryStatus } from "@/types/category";

interface ProductTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  idProduct?: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  value?: string;
}

export default function ProductTableToolbar(props: ProductTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    handleChange,
    value,
  } = props;
  const { data: cat } = useCategoryList({ status: CategoryStatus.Active });

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
            fullWidth
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
            labelId="display-option-select"
            id="demo-simple-select"
            value={value ? value : "0"}
            name="roleId"
            onChange={handleChange}
          >
            <MenuItem
              sx={{
                color: "black",
              }}
              value={"0"}
            >
              All Categories
            </MenuItem>
            {!!cat &&
              !!cat.items &&
              !!cat.items.length &&
              cat.items.map((item) => (
                <MenuItem
                  key={item._id}
                  sx={{
                    color: "black",
                  }}
                  value={item._id}
                >
                  {item.name}
                </MenuItem>
              ))}
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
            textAlign: "right",
            //   borderRadius: "15px",
            background: primary[50],
            color: primary[800],
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
