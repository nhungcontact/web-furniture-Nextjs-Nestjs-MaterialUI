/* eslint-disable max-lines */
"use client";
import useQueryParams from "@/hooks/shared/useQueryParams";
import useUserList from "@/hooks/users/useUserList";
import { ListOptions } from "@/types/shared";
import { User, UserStatus, UserType } from "@/types/user";
import {
  Box,
  Button,
  Divider,
  LinearProgress,
  Pagination,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import UserHeaderTab from "./UserHeaderTab";
import UserTableBody from "./UserTableBody";
import UserTableHead from "./UserTableHead";
import UserTableToolbar from "./UserTableToolbar";

export type Order = "asc" | "desc";

export default function UserTable() {
  const [options, setOptions] = useQueryParams<ListOptions<User>>({
    limit: 10,
    offset: 0,
    sortBy: "username",
    sortOrder: "asc",
    userType: UserType.Personnel,
    status: UserStatus.Active,
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
  const handleChangeRole = (name: string, event: SelectChangeEvent<string>) => {
    console.log(event.target.value);
    if (name === "role") {
      if (event.target.value === "0") {
        setOptions({
          roles: undefined,
        });
      } else if (event.target.value) {
        setOptions({
          roles: [event.target.value],
        });
      } else {
        setOptions({
          roles: undefined,
        });
      }
    } else {
      setOptions({
        status: event.target.value as UserStatus,
      });
    }
  };
  const handleSetType = (type: UserType) => {
    setOptions({
      userType: type,
    });
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof User) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  return (
    <>
      {(isValidating || isLoading) && <LinearProgress />}
      <Box sx={{ px: 4, py: 2 }}>
        <UserHeaderTab
          getType={handleSetType}
          type={options.userType}
        />
        <Box sx={{ width: "100%", overflow: "hidden", py: 2 }}>
          <UserTableToolbar
            getValueSearch={handleSearchChange}
            defaultValueSearch={options.search}
            valuePageSize={pageSize}
            onChangePageSize={handleChangePageSize}
            handleChange={handleChangeRole}
            role={options.roles as any}
            status={options.status}
          />
          <Box
            textAlign="start"
            py={2}
          >
            <Button
              variant="contained"
              className="btn-action"
              sx={{ borderRadius: "15px" }}
            >
              Total: {data?.total ?? "-"}
            </Button>
          </Box>

          <TableContainer sx={{ maxHeight: 440, margin: "auto" }}>
            <Table
              stickyHeader
              aria-label="sticky table"
            >
              <UserTableHead
                order={options.sortOrder}
                orderBy={options.sortBy}
                onRequestSort={handleRequestSort}
              />
              {!!data && (
                <TableBody>
                  {!!data.items.length &&
                    data.items.map((item, index) => {
                      return (
                        <UserTableBody
                          key={item._id}
                          data={item}
                          index={index}
                        />
                      );
                    })}
                  {!isLoading && !data && (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={7}
                      >
                        <Typography
                          variant={"body1"}
                          fontWeight={600}
                          textTransform={"capitalize"}
                          color="black"
                        >
                          No data
                        </Typography>
                      </TableCell>{" "}
                    </TableRow>
                  )}
                  {!isLoading && error && (
                    <TableRow>
                      <TableCell
                        align="center"
                        colSpan={7}
                      >
                        <Typography
                          variant={"body1"}
                          color="red"
                        >
                          {error?.message}
                        </Typography>
                      </TableCell>{" "}
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
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
        </Box>
      </Box>
    </>
  );
}
