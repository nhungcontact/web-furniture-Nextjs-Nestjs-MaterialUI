/* eslint-disable max-lines */
"use client";
import useReviewList from "@/hooks/reviews/useReviewList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { GetReview, Review, ReviewStatus } from "@/types/review";
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
import ReviewTableBody from "./ReviewTableBody";
import ReviewTableHead from "./ReviewTableHead";
import ReviewTableToolbar from "./ReviewTableToolbar";

export type Order = "asc" | "desc";

export default function ReviewTable() {
  const [options, setOptions] = useQueryParams<ListOptions<Review>>({
    limit: 10,
    offset: 0,
    sortBy: "product",
    sortOrder: "asc",
    search: "",
    status: ReviewStatus.Approved,
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useReviewList(options);

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

  const handleGetValue = (value?: ReviewStatus) => {
    setOptions({
      limit: 10,
      status: value,
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GetReview,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <ReviewTableToolbar
        // numSelected={selected.length}
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        // getValueSearchByChange={handleSearchByChange}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        getValueType={handleGetValue}
        // handleRemove={handleRemove}
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
          <ReviewTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />
          {!!data && (
            <TableBody>
              {!!data.items.length &&
                data.items.map((item, index) => {
                  return (
                    <ReviewTableBody
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
