import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { BlogStatus } from "@/types/blog";
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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchInput from "../shared/SearchInput";

interface BlogTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  //   getValueSearchByChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  getValueType: (v?: BlogStatus) => void;

  //   handleRemove: () => void;
}

export default function BlogTableToolbar(props: BlogTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    getValueType,

    // handleRemove,
  } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("status");

  const [status, setStatus] = useState<BlogStatus>(
    search ? (search as BlogStatus) : BlogStatus.Approved,
  );

  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };

  const handleChange = (event: SelectChangeEvent<BlogStatus>) => {
    setStatus(event.target.value as BlogStatus);
    getValueType(event.target.value as BlogStatus);
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
            <MenuItem value={BlogStatus.Approved}>{BlogStatus.Approved}</MenuItem>
            <MenuItem value={BlogStatus.UnApproved}>{BlogStatus.UnApproved}</MenuItem>
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
