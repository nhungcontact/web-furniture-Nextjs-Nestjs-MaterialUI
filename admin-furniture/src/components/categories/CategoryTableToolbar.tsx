import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { CategoryStatus } from "@/types/category";
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

interface CategoryTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  handleChange: (event: SelectChangeEvent<CategoryStatus>) => void;
  status?: CategoryStatus;
}

export default function CategoryTableToolbar(props: CategoryTableToolbarProps) {
  const {
    // numSelected,
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    // handleRemove,
    handleChange,
    status,
    // room,
    // handleChangeRoom,
  } = props;
  //   const { data: rooms } = useRoomFurnitureList({});
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
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        // }),
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
            value={status ? status : CategoryStatus.Active}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={CategoryStatus.Active}>{CategoryStatus.Active}</MenuItem>
            <MenuItem value={CategoryStatus.Inactive}>{CategoryStatus.Inactive}</MenuItem>
          </Select>
        </FormControl>

        {/* <FormControl sx={{ marginLeft: 2 }}>
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
            value={room ? room : "All"}
            name="type"
            onChange={handleChangeRoom}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {!!rooms &&
              !!rooms.items &&
              !!rooms.items.length &&
              rooms.items.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl> */}
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
