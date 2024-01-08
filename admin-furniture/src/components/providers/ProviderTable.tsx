/* eslint-disable max-lines */
"use client";
import useProviderList from "@/hooks/providers/useProviderList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Provider, ProviderStatus } from "@/types/provider";
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
import ProviderTableBody from "./ProviderTableBody";
import ProviderTableHead from "./ProviderTableHead";
import ProviderTableToolbar from "./ProviderTableToolbar";

export type Order = "asc" | "desc";

export default function ProviderTable() {
  const [options, setOptions] = useQueryParams<ListOptions<Provider>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    status: ProviderStatus.Active,
  });

  const { data, error, isLoading, isValidating } = useProviderList(options);

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
    property: keyof Provider,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  const handleChangeStatus = (event: SelectChangeEvent<ProviderStatus>) => {
    setOptions({
      status: event.target.value as ProviderStatus,
    });
  };

  return (
    <>
      {(isValidating || isLoading) && <LinearProgress />}
      <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
        <ProviderTableToolbar
          getValueSearch={handleSearchChange}
          defaultValueSearch={options.search}
          valuePageSize={pageSize}
          onChangePageSize={handleChangePageSize}
          handleChange={handleChangeStatus}
          status={options.status}
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
          <Table
            stickyHeader
            aria-label="sticky table"
          >
            <ProviderTableHead
              order={options.sortOrder}
              orderBy={options.sortBy}
              onRequestSort={handleRequestSort}
            />
            {!!data && (
              <TableBody>
                {!!data.items.length &&
                  data.items.map((item, index) => {
                    return (
                      <ProviderTableBody
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
    </>
  );
}
