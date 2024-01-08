import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { CommentStatus } from "@/types/comment";
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
import { useState } from "react";
import SearchInput from "../shared/SearchInput";

interface CommentTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  getValueType: (v?: CommentStatus) => void;
}

export default function CommentTableToolbar(props: CommentTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    getValueType,
  } = props;
  const [status, setStatus] = useState<CommentStatus>(CommentStatus.Approved);

  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };

  const handleChange = (event: SelectChangeEvent<CommentStatus>) => {
    setStatus(event.target.value as CommentStatus);
    getValueType(event.target.value as CommentStatus);
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
            value={status}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={CommentStatus.Approved}>{CommentStatus.Approved}</MenuItem>
            <MenuItem value={CommentStatus.UnApproved}>
              {CommentStatus.UnApproved}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="display-sb">
        <Select
          value={valuePageSize}
          onChange={handleChangePageSize}
          sx={{
            height: "50px",
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
