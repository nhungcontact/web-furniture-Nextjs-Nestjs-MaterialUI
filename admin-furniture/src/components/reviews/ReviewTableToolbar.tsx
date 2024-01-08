import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { ReviewStatus } from "@/types/review";
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

interface ReviewTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  getValueType: (value?: ReviewStatus) => void;
}

export default function ReviewTableToolbar(props: ReviewTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    getValueType,
  } = props;
  const searchParams = useSearchParams();
  const search = searchParams.get("status");

  const [status, setStatus] = useState<ReviewStatus>(
    search ? (search as ReviewStatus) : ReviewStatus.Approved,
  );

  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };

  const handleChange = (event: SelectChangeEvent<ReviewStatus>) => {
    setStatus(event.target.value as ReviewStatus);
    getValueType(event.target.value as ReviewStatus);
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
            value={status}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={ReviewStatus.Approved}>{ReviewStatus.Approved}</MenuItem>
            <MenuItem value={ReviewStatus.UnApproved}>{ReviewStatus.UnApproved}</MenuItem>
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
