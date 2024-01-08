/* eslint-disable max-lines */
import { primary } from "@/config/theme";
import useRoleList from "@/hooks/roles/useRoleList";
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
import { UserStatus } from "@/types/user";

interface UserTableToolbarProps {
  getValueSearch: (v?: string) => void;
  defaultValueSearch?: string;
  onChangePageSize: (e: SelectChangeEvent<number>) => void;
  valuePageSize: number;
  handleChange: (name: string, event: SelectChangeEvent<string>) => void;
  role?: string;
  status?: string;
}

export default function UserTableToolbar(props: UserTableToolbarProps) {
  const {
    getValueSearch,
    defaultValueSearch,
    onChangePageSize,
    valuePageSize,
    handleChange,
    role,
    status,
  } = props;
  const { data: roles } = useRoleList({});
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
        py: 1,
      }}
    >
      <Box sx={{ flex: "1 1 100%" }}>
        <Box display="flex">
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
              // borderRadius: "15px",
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
              value={role ? role : "0"}
              name="roleId"
              onChange={(e) => handleChange("role", e)}
            >
              <MenuItem
                sx={{
                  color: "black",
                }}
                value={"0"}
              >
                All Role
              </MenuItem>
              {!!roles &&
                !!roles.items &&
                !!roles.items.length &&
                roles.items.map((item) => (
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
              value={status ? status : UserStatus.Active}
              name="roleId"
              onChange={(e) => handleChange("status", e)}
            >
              <MenuItem
                sx={{
                  color: "black",
                }}
                value={UserStatus.Active}
              >
                {UserStatus.Active}
              </MenuItem>
              <MenuItem
                sx={{
                  color: "black",
                }}
                value={UserStatus.Inactive}
              >
                {UserStatus.Inactive}
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="display-sb">
        <Select
          fullWidth
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
          value={valuePageSize}
          onChange={handleChangePageSize}
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
