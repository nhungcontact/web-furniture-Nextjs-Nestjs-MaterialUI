/* eslint-disable max-lines */
"use client";
import useProductList from "@/hooks/products/useProductList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Product } from "@/types/product";
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
import { ChangeEvent, SyntheticEvent } from "react";
import ProductHeaderTab from "./ProductHeaderTab";
import ProductTableBody from "./ProductTableBody";
import ProductTableHead from "./ProductTableHead";
import ProductTableToolbar from "./ProductTableToolbar";

export type Order = "asc" | "desc";

export default function ProductTable() {
  const [options, setOptions] = useQueryParams<ListOptions<Product>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: undefined,
    isHidden: false,
  });

  const { data, error, isLoading, isValidating } = useProductList(options);
  console.log("data", data);

  const { data: getLength } = useProductList({});

  const pageSize = data?.options.limit ?? 5;
  const currentPage = Math.floor((data?.options.offset ?? 0) / pageSize) + 1;
  const totalPage = Math.ceil((getLength?.total ?? 0) / pageSize);

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
    property: keyof Product,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  const handleChangeStatus = (event: SyntheticEvent, type: string) => {
    if (type === "true") {
      setOptions({
        isHidden: true,
      });
    } else {
      setOptions({
        isHidden: undefined,
      });
    }
  };
  const handleChangeCat = (event: SelectChangeEvent<string>) => {
    if (event.target.value === "0") {
      setOptions({
        category: undefined,
      });
    } else {
      setOptions({
        category: event.target.value,
      });
    }
  };

  const onUpdate = (name?: boolean) => {
    console.log(name);
    setOptions({
      isHidden: name,
    });
  };

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <ProductHeaderTab
        handleChange={handleChangeStatus}
        type={options.isHidden}
      />
      <Box sx={{ width: "100%", overflow: "hidden", py: 2 }}>
        <ProductTableToolbar
          getValueSearch={handleSearchChange}
          defaultValueSearch={options.search}
          valuePageSize={pageSize}
          onChangePageSize={handleChangePageSize}
          handleChange={handleChangeCat}
          value={options.category}
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

        <TableContainer sx={{ margin: "auto" }}>
          {(isValidating || isLoading) && (
            <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
          )}
          <Table
            stickyHeader
            aria-label="sticky table"
          >
            <ProductTableHead
              order={options.sortOrder}
              orderBy={options.sortBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {!!data &&
                !!data.items.length &&
                data.items.map((item, index) => {
                  return (
                    <ProductTableBody
                      key={item._id}
                      product={item}
                      index={index}
                      onUpdate={onUpdate}
                    />
                  );
                })}
              {((!isLoading && !data) || data?.total == 0) && (
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
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        {data?.total !== 0 && (
          <Pagination
            color="primary"
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
        )}
      </Box>
    </Box>
  );
}
