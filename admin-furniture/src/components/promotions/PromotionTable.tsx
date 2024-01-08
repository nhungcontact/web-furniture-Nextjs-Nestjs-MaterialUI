/* eslint-disable max-lines */
"use client";
import usePromotionList from "@/hooks/promotions/usePromotionList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Promotion, PromotionType } from "@/types/promotion";
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
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import PromotionTableBody from "./PromotionTableBody";
import PromotionTableHead from "./PromotionTableHead";
import PromotionTableToolbar from "./PromotionTableToolbar";
import PromotionHeaderTab from "./PromotionHeaderTab";

export type Order = "asc" | "desc";

export default function PromotionTable() {
  const [value, setValue] = useState<string>();

  const [options, setOptions] = useQueryParams<ListOptions<Promotion>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    type: PromotionType.Number,
  });

  const { data, isLoading, isValidating } = usePromotionList(options);

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
  const handleSelectTypeByChange = (v: string) => {
    setOptions({
      type: v as PromotionType,
      offset: 0,
    });
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Promotion,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  const handleChangeTab = (event: SyntheticEvent, type: string) => {
    if (type === "expired") {
      setOptions({
        dateExpire: new Date(),
        quantity: undefined,
      });
    } else if (type === "sold-out") {
      setOptions({
        quantity: 0,
        dateExpire: undefined,
      });
    } else if (type === "not-applied") {
      setOptions({
        quantity: undefined,
        dateExpire: undefined,
        dateApply: new Date(),
      });
    } else {
      setOptions({
        quantity: undefined,
        dateExpire: undefined,
        dateApply: undefined,
      });
    }
  };
  useEffect(() => {
    if (options.dateExpire) {
      setValue("expired");
    } else if (options.quantity === 0) {
      setValue("sold-out");
    } else if (options.dateApply) {
      setValue("not-applied");
    } else {
      setValue("in-use");
    }
  }, [options.dateExpire, options.quantity, options.dateApply]);

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <PromotionHeaderTab
        handleChange={handleChangeTab}
        type={value}
      />
      {(isValidating || isLoading) && <LinearProgress />}
      <Box sx={{ width: "100%", overflow: "hidden", py: 2 }}>
        <PromotionTableToolbar
          getValueSearch={handleSearchChange}
          defaultValueSearch={options.search}
          getValueType={handleSelectTypeByChange}
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
            Total:
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 440, margin: "auto" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
          >
            <PromotionTableHead
              order={options.sortOrder}
              orderBy={options.sortBy}
              onRequestSort={handleRequestSort}
              options={options}
            />

            <TableBody>
              {!!data &&
                !!data.items &&
                !!data.items.length &&
                data.items.map((item, index) => {
                  return (
                    <PromotionTableBody
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
                      variant="body1"
                      fontWeight="bold"
                    >
                      No data
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
    </Box>
  );
}
