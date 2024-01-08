import { Delete, FilterList, Search } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import SearchInput from "../shared/SearchInput";

interface DisplayOptionTableToolbarProps {
  numSelected: number;
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  //   getValueSearchByChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  handleRemove: () => void;
}

export default function DisplayOptionTableToolbar(props: DisplayOptionTableToolbarProps) {
  const {
    numSelected,
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    handleRemove,
  } = props;
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
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
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
              height: "40px",
              width: "250px",
            }}
          />
        </Box>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleRemove}>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Box className="display-sb">
          <Select
            size="small"
            variant="standard"
            // disableUnderline
            value={valuePageSize}
            onChange={handleChangePageSize}
            sx={{ width: 100, textAlign: "right" }}
          >
            <MenuItem
              value={5}
              sx={{ justifyContent: "flex-end" }}
            >
              Show 05
            </MenuItem>
            <MenuItem
              value={10}
              sx={{ justifyContent: "flex-end" }}
            >
              Show 10
            </MenuItem>
            <MenuItem
              value={15}
              sx={{ justifyContent: "flex-end" }}
            >
              Show 15
            </MenuItem>
          </Select>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}
