/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import useProductSkuListByProduct from "@/hooks/product-skus/useProductSkuListByProduct";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { GetProductSku } from "@/types/product-sku";
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
import { useParams } from "next/navigation";
import { ChangeEvent } from "react";
import ProductDetailTableBody from "./ProductDetailTableBody";
import ProductDetailTableHead from "./ProductDetailTableHead";
import ProductDetailTableToolbar from "./ProductDetailTableToolbar";

export type Order = "asc" | "desc";

export default function ProductDetailTable() {
  const param = useParams();
  const [options, setOptions] = useQueryParams<ListOptions<GetProductSku>>({
    limit: 10,
    offset: 0,
    sortBy: "numberSKU",
    sortOrder: "asc",
    search: "",
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useProductSkuListByProduct(
    options,
    param.id as any,
  );

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
    property: keyof GetProductSku,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  const totalQuantity = data?.items.reduce((accumulator, item) => {
    // Assuming each item has a property 'quantitySold'
    return accumulator + item.quantityInStock;
  }, 0);

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <ProductDetailTableToolbar
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
      <Box
        textAlign="start"
        py={2}
      >
        <Typography variant="body1">
          Product: <b>{data?.items[0].product.name ?? "-"}</b>
        </Typography>
        <Typography variant="body1">
          Total quantity: <b>{totalQuantity} products</b>
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 440, margin: "auto" }}>
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        <Table
          stickyHeader
          aria-label="sticky table"
        >
          <ProductDetailTableHead
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
                  <ProductDetailTableBody
                    key={item._id}
                    data={item}
                    index={index}
                  />
                );
              })}
            </TableBody>
          )}{" "}
          {!isLoading && !data && (
            <TableRow>
              <TableCell
                align="center"
                colSpan={12}
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
                colSpan={12}
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
