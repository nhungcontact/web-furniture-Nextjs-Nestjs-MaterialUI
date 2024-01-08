/* eslint-disable max-lines */
"use client";
import useContactList from "@/hooks/contacts/useContactList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { ContactStatus, Contact } from "@/types/contact";
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
import ContactTableBody from "./ContactTableBody";
import ContactTableHead from "./ContactTableHead";
import ContactTableToolbar from "./ContactTableToolbar";

export type Order = "asc" | "desc";

export default function ContactTable() {
  const [options, setOptions] = useQueryParams<ListOptions<Contact>>({
    limit: 10,
    offset: 0,
    sortBy: "username",
    sortOrder: "asc",
    search: "",
    status: ContactStatus.NoResponse,
  });

  const { data, error, isLoading, isValidating } = useContactList(options);

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

  const handleChange = (event: SelectChangeEvent<ContactStatus>) => {
    setOptions({
      limit: 10,
      status: event.target.value as ContactStatus,
    });
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Contact,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <ContactTableToolbar
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        handleChange={handleChange}
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
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        <Table
          stickyHeader
          aria-label="sticky table"
        >
          <ContactTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {!!data &&
              !!data.items.length &&
              data.items.map((item, index) => {
                return (
                  <ContactTableBody
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
