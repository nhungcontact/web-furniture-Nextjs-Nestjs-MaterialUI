/* eslint-disable max-lines */
"use client";
import useBillList from "@/hooks/bills/useBillList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Bill, BillStatus } from "@/types/bill";
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
import { ChangeEvent, useEffect, useState } from "react";
import BillTableBody from "./BillTableBody";
import BillTableHead from "./BillTableHead";
import BillTableToolbar from "./BillTableToolbar";

export type Order = "asc" | "desc";

export default function BillTable() {
  const [value, setValue] = useState<BillStatus | string>();
  const [options, setOptions] = useQueryParams<ListOptions<Bill>>({
    limit: 10,
    offset: 0,
    sortBy: "number",
    sortOrder: "asc",
    search: "",
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useBillList(options);

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

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Bill) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  const handleChangeStatus = (event: SelectChangeEvent<BillStatus | string>) => {
    if (event.target.value === "All") {
      setOptions({
        limit: 10,
        offset: 0,
        sortBy: "number",
        sortOrder: "asc",
        search: "",
        status: undefined,
        request: undefined,
      });
    } else if (event.target.value === "true") {
      setOptions({
        request: true,
        status: undefined,
      });
    } else {
      setOptions({
        request: undefined,
        status: event.target.value as BillStatus,
      });
    }
  };
  useEffect(() => {
    if (options.status && !options.request) {
      setValue(options.status);
    } else if (!options.status && options.request) {
      setValue(`${options.request}`);
    } else {
      setValue(undefined);
    }
  }, [options.request, options.status]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <BillTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        handleChange={handleChangeStatus}
        status={value}
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
          <BillTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {!!data &&
              !!data.items.length &&
              data.items.map((item, index) => {
                return (
                  <BillTableBody
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
                  colSpan={10}
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
                  colSpan={10}
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
