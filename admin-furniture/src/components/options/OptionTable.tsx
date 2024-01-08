/* eslint-disable max-lines */
"use client";
import useOptionList from "@/hooks/options/useOptionList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Option } from "@/types/option";
import { ListOptions } from "@/types/shared";
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
import OptionTableBody from "./OptionTableBody";
import OptionTableHead from "./OptionTableHead";
import OptionTableToolbar from "./OptionTableToolbar";

export type Order = "asc" | "desc";

export default function OptionTable() {
  const [options, setOptions] = useQueryParams<ListOptions<Option>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useOptionList(options);

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
    property: keyof Option,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <OptionTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        // getValueSearchByChange={handleSearchByChange}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
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
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        <Table
          stickyHeader
          aria-label="sticky table"
        >
          <OptionTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />

          {!!data && (
            <TableBody>
              {!!data.items.length &&
                data.items.map((item, index) => {
                  return (
                    <OptionTableBody
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
  );
}
