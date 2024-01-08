import { primary } from "@/config/theme";
import { sort } from "@/mocks/shares.mock";
import { PromotionType } from "@/types/promotion";
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

interface PromotionTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  getValueType: (v: string) => void;
}

export default function PromotionTableToolbar(props: PromotionTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    getValueType,
  } = props;
  const [promotionType, setPromotionType] = useState<PromotionType>(PromotionType.Number);

  const handleChange = (event: SelectChangeEvent<PromotionType>) => {
    setPromotionType(event.target.value as PromotionType);
    getValueType(event.target.value as PromotionType);
  };

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
      <Box sx={{ flex: "1 1 100%", pt: 3 }}>
        <Box sx={{ display: "flex" }}>
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
              value={promotionType}
              name="type"
              onChange={handleChange}
            >
              <MenuItem value={PromotionType.Number}>{PromotionType.Number}</MenuItem>
              <MenuItem value={PromotionType.Percent}>{PromotionType.Percent}</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
