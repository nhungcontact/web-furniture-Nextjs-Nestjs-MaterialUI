"use client";
import useCategoryRemove from "@/hooks/categories/useCategoryRemove";
import useDisplayOptionList from "@/hooks/display-types/useDisplayOptionList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { DisplayOption } from "@/types/display-option";
import { ListOptions } from "@/types/shared";
import {
  Alert,
  Box,
  Divider,
  LinearProgress,
  Pagination,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import DisplayOptionTableBody from "./DisplayOptionTableBody";
import DisplayOptionTableHead from "./DisplayOptionTableHead";
import DisplayOptionTableToolbar from "./DisplayOptionTableToolbar";

export type Order = "asc" | "desc";

export default function DisplayOptionTable() {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [options, setOptions] = useQueryParams<ListOptions<DisplayOption>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useDisplayOptionList(options);

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
  //   const handleSearchByChange =
  //   (field: keyof Category) => (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //     if (checked) {
  //       return setOptions({
  //         searchBy: [...(options.searchBy ?? []), field],
  //       });
  //     } else {
  //       return setOptions({
  //         searchBy: options.searchBy?.filter((item) => item !== field),
  //       });
  //     }
  //   };
  //   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.checked && data) {
  //       const newSelected = data?.items.map((n) => n.name);
  //       setSelected(newSelected);
  //       return;
  //     }
  //     setSelected([]);
  //   };
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    console.log(newSelected);
    setSelected(newSelected);
  };
  const { trigger: removeCat } = useCategoryRemove(selected[0]);

  const handleRemove = () => {
    if (selected.length > 1) {
      alert("Currently, can not remove multiple item");
    } else {
      removeCat()
        .then(() => {
          setSelected([]);
          alert("SUCCESS");
          //   enqueueSnackbar("successfully", { variant: "success" });
        })
        .catch((e) => {
          setSelected([]);
          alert(e?.message);
          //   enqueueSnackbar(e?.message, { variant: "error" });
        });
    }
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DisplayOption,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <DisplayOptionTableToolbar
        numSelected={selected.length}
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        // getValueSearchByChange={handleSearchByChange}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        handleRemove={handleRemove}
      />
      <Paper
        variant="outlined"
        sx={{
          margin: "16px",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          {(isValidating || isLoading) && (
            <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
          )}
          <Table
            stickyHeader
            aria-label="sticky table"
          >
            <DisplayOptionTableHead
              order={options.sortOrder}
              orderBy={options.sortBy}
              onRequestSort={handleRequestSort}
              //   onSelectAllClick={handleSelectAllClick}
              //   rowCount={data?.items.length ?? 0}
              //   numSelected={selected.length}
            />
            {!!data && (
              <TableBody>
                {data.items.map((item) => {
                  const isItemSelected = isSelected(item._id);
                  return (
                    <DisplayOptionTableBody
                      key={item._id}
                      data={item}
                      onClickSelect={handleClick}
                      isItemSelected={isItemSelected}
                    />
                  );
                })}
              </TableBody>
            )}
          </Table>
          {!isLoading && error && <Alert severity="error">{error?.message}</Alert>}
          {!isLoading && !data && <Alert severity="info">no data</Alert>}
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
      </Paper>
    </Box>
  );
}
