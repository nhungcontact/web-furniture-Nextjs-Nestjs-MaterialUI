"use client";

import useQueryParams from "@/hooks/shared/useQueryParams";
import useUserList from "@/hooks/users/useUserList";
import { ListOptions } from "@/types/shared";
import { User } from "@/types/user";
import {
  Alert,
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  List,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import SearchInput from "../shared/SearchInput";
import UserListItem from "./UserListItem";

function UserList() {
  const t = useTranslations("UserList");
  const [options, setOptions] = useQueryParams<ListOptions<User>>({
    limit: 5,
    offset: 0,
    search: "",
    searchBy: [],
  });

  const { data, error, isLoading, isValidating } = useUserList(options);

  const pageSize = data?.options.limit ?? 5;
  const currentPage = Math.floor((data?.options.offset ?? 0) / pageSize) + 1;
  const totalPage = Math.ceil((data?.total ?? 0) / pageSize);

  const handleChangePage = (e: ChangeEvent<unknown>, page: number) => {
    setOptions({
      offset: (page - 1) * pageSize,
    });
  };

  const handleChangePageSize = (e: SelectChangeEvent<number>) => {
    setOptions({
      limit: Number(e.target.value),
    });
  };

  const handleSearchChange = (value?: string) => {
    setOptions({
      search: value,
      offset: 0,
    });
  };

  const handleSearchByChange =
    (field: keyof User) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        return setOptions({
          searchBy: [...(options.searchBy ?? []), field],
        });
      } else {
        return setOptions({
          searchBy: options.searchBy?.filter((item) => item !== field),
        });
      }
    };

  return (
    <>
      <FormGroup
        row
        sx={{ paddingX: 2, borderBottom: "solid 1px grey" }}
      >
        {(["displayName", "username", "email", "tel"] as (keyof User)[]).map((field) => (
          <FormControlLabel
            key={`searchBy-${field}`}
            control={
              <Checkbox
                checked={options.searchBy?.includes(field)}
                onChange={handleSearchByChange(field)}
              />
            }
            label={field}
          />
        ))}
      </FormGroup>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
      >
        <SearchInput
          size="small"
          disableUnderline
          placeholder={t("searchPlaceholder")}
          onValueChange={handleSearchChange}
          defaultValue={options.search}
          sx={{ flexGrow: 1, paddingY: 1, paddingX: 2, input: { padding: 0 } }}
        />
        <Box>
          <Divider orientation="vertical" />
        </Box>
        <Select
          size="small"
          variant="standard"
          disableUnderline
          value={pageSize}
          onChange={handleChangePageSize}
          sx={{ width: 100, textAlign: "right" }}
        >
          <MenuItem
            value={5}
            sx={{ justifyContent: "flex-end" }}
          >
            {t("Show")} 05
          </MenuItem>
          <MenuItem
            value={10}
            sx={{ justifyContent: "flex-end" }}
          >
            {t("Show")} 10
          </MenuItem>
          <MenuItem
            value={15}
            sx={{ justifyContent: "flex-end" }}
          >
            {t("Show")} 15
          </MenuItem>
        </Select>
      </Box>
      <Divider />
      <Box sx={{ minHeight: UserListItem.height * pageSize, position: "relative" }}>
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        {!!data && (
          <List disablePadding>
            {data.items.map((item) => (
              <UserListItem
                key={item._id}
                user={item}
              />
            ))}
          </List>
        )}
        {!isLoading && error && (
          <Alert severity="error">
            {t("error")} {error?.message}
          </Alert>
        )}
        {!isLoading && !data && <Alert severity="info">{t("noData")}</Alert>}
      </Box>
      <Divider />
      <Pagination
        page={currentPage}
        count={totalPage}
        onChange={handleChangePage}
        sx={{
          my: 1,
          ul: {
            justifyContent: "center",
          },
        }}
      />
    </>
  );
}

export default UserList;
