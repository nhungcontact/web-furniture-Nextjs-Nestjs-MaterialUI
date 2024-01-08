/* eslint-disable max-lines */
"use client";
import useOptionValueList from "@/hooks/option-values/useOptionValueList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { GetOptionValue, OptionValue } from "@/types/option-value";
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
import OptionValueTableBody from "./OptionValueTableBody";
import OptionValueTableHead from "./OptionValueTableHead";
import OptionValueTableToolbar from "./OptionValueTableToolbar";

export type Order = "asc" | "desc";

export default function OptionValueTable() {
  const [options, setOptions] = useQueryParams<ListOptions<OptionValue>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",

    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useOptionValueList(options);

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
    property: keyof GetOptionValue,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  const handleChangeOption = (event: SelectChangeEvent<string>) => {
    if (event.target.value === "All") {
      setOptions({
        offset: 0,
        sortBy: "name",
        sortOrder: "asc",
      });
    } else {
      setOptions({
        offset: 0,
        optionSku: event.target.value as string,
      });
    }
  };
  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <OptionValueTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        // getValueSearchByChange={handleSearchByChange}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        option={options.optionSku}
        handleChangeOption={handleChangeOption}
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
          <OptionValueTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
            //   onSelectAllClick={handleSelectAllClick}
            //   rowCount={data?.items.length ?? 0}
            //   numSelected={selected.length}
          />
          {!!data && (
            <TableBody>
              {data.items.map((item, index) => {
                return (
                  <OptionValueTableBody
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
