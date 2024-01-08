/* eslint-disable max-lines */
"use client";
import useBlogList from "@/hooks/blogs/useBlogList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { BlogStatus, GetBlog } from "@/types/blog";
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
import BlogTableBody from "./BlogTableBody";
import BlogTableHead from "./BlogTableHead";
import BlogTableToolbar from "./BlogTableToolbar";

export type Order = "asc" | "desc";

export default function BlogTable() {
  const [options, setOptions] = useQueryParams<ListOptions<GetBlog>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    status: BlogStatus.Approved,
  });

  const { data, error, isLoading, isValidating } = useBlogList(options);
  console.log("blog", data);

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
  const handleGetValue = (value?: BlogStatus) => {
    setOptions({
      limit: 10,
      offset: 0,
      status: value,
    });
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GetBlog,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <BlogTableToolbar
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
          Total:{data?.total ?? "-"}
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
          <BlogTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
            //   onSelectAllClick={handleSelectAllClick}
            //   rowCount={data?.items.length ?? 0}
            //   numSelected={selected.length}
          />
          {!!data && (
            <TableBody>
              {!!data.items.length &&
                data.items.map((item, index) => {
                  return (
                    <BlogTableBody
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
