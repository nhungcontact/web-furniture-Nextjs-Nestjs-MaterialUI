import { primary } from "@/config/theme";
import useOptionList from "@/hooks/options/useOptionList";
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

interface OptionTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  //   getValueSearchByChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  handleChangeOption: (event: SelectChangeEvent<string>) => void;
  option?: string;
}

export default function OptionTableToolbar(props: OptionTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    handleChangeOption,
    option,
  } = props;
  const { data: options } = useOptionList({});
  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };
  const handleChangePageSize = (e: SelectChangeEvent<number>) => {
    onChangePageSize(e);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
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
            value={option ? option : "All"}
            name="type"
            onChange={handleChangeOption}
          >
            <MenuItem value={"All"}>All</MenuItem>

            {!!options &&
              !!options.items &&
              !!options.items.length &&
              options.items.map((item) => (
                <MenuItem
                  key={item._id}
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
          fullWidth
          // disableUnderline
          value={valuePageSize}
          onChange={handleChangePageSize}
          sx={{
            textAlign: "right",
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
