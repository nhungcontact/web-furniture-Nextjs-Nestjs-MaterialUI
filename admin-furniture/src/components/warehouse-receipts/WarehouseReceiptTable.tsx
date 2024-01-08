/* eslint-disable max-lines */
"use client";
import useQueryParams from "@/hooks/shared/useQueryParams";
import useWarehouseReceiptList from "@/hooks/warehouse-receipts/useWarehouseReceiptList";
import { ListOptions } from "@/types/shared";
import {
  GetWarehouseReceipt,
  WRStatus,
  WarehouseReceipt,
} from "@/types/warehouse-receipt";
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
import WarehouseReceiptTableBody from "./WarehouseReceiptTableBody";
import WarehouseReceiptTableHead from "./WarehouseReceiptTableHead";
import WarehouseReceiptTableToolbar from "./WarehouseReceiptTableToolbar";

export type Order = "asc" | "desc";

export default function WarehouseReceiptTable() {
  const [options, setOptions] = useQueryParams<ListOptions<GetWarehouseReceipt>>({
    limit: 10,
    offset: 0,
    sortBy: "user",
    sortOrder: "asc",
    search: "",
    status: WRStatus.Approved,
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useWarehouseReceiptList(options);

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
    property: keyof WarehouseReceipt,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  const handleChangeStatus = (event: SelectChangeEvent<WRStatus>) => {
    setOptions({
      status: event.target.value as WRStatus,
    });
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <WarehouseReceiptTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        status={options.status}
        handleChange={handleChangeStatus}
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
          <WarehouseReceiptTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {!!data &&
              !!data.items.length &&
              data.items.map((item, index) => {
                return (
                  <WarehouseReceiptTableBody
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
