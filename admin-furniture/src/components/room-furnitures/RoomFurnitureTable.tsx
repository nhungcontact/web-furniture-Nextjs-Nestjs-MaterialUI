/* eslint-disable max-lines */
"use client";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { RoomFurniture, RoomFurnitureStatus } from "@/types/room-furniture";
import { ListOptions } from "@/types/shared";
import {
  Box,
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
import RoomFurnitureTableBody from "./RoomFurnitureTableBody";
import RoomFurnitureTableHead from "./RoomFurnitureTableHead";
import RoomFurnitureTableToolbar from "./RoomFurnitureTableToolbar";

export type Order = "asc" | "desc";

export default function RoomFurnitureTable() {
  const [options, setOptions] = useQueryParams<ListOptions<RoomFurniture>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    status: RoomFurnitureStatus.Active,
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useRoomFurnitureList(options);

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
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof RoomFurniture,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  const handleChangeStatus = (event: SelectChangeEvent<RoomFurnitureStatus>) => {
    setOptions({
      status: event.target.value as RoomFurnitureStatus,
    });
  };
  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <RoomFurnitureTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        status={options.status}
        handleChange={handleChangeStatus}
      />

      <TableContainer sx={{ maxHeight: 440, margin: "auto" }}>
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        <Table
          stickyHeader
          aria-label="sticky table"
        >
          <RoomFurnitureTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />
          {!!data && (
            <TableBody>
              {data.items.map((item, index) => {
                return (
                  <RoomFurnitureTableBody
                    key={item._id}
                    data={item}
                    index={index}
                  />
                );
              })}
            </TableBody>
          )}
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
              </TableCell>
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
              </TableCell>
            </TableRow>
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
  );
}
