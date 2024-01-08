/* eslint-disable max-lines */
"use client";
import useCategoryList from "@/hooks/categories/useCategoryList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { CategoryStatus, GetCategory } from "@/types/category";
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
import CategoryTableBody from "./CategoryTableBody";
import CategoryTableHead from "./CategoryTableHead";
import CategoryTableToolbar from "./CategoryTableToolbar";

export type Order = "asc" | "desc";

export default function CategoryTable() {
  //   const [selected, setSelected] = useState<readonly string[]>([]);
  const [options, setOptions] = useQueryParams<ListOptions<GetCategory>>({
    limit: 10,
    offset: 0,
    sortBy: "name",
    sortOrder: "asc",
    search: "",
    status: CategoryStatus.Active,
    // searchBy: "name",
  });

  const { data, error, isLoading, isValidating } = useCategoryList(options);

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
  //   const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //     const selectedIndex = selected.indexOf(id);
  //     let newSelected: readonly string[] = [];
  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, id);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1),
  //       );
  //     }
  //     console.log(newSelected);
  //     setSelected(newSelected);
  //   };
  //   const { trigger: removeCat } = useCategoryRemove(selected[0]);

  //   const handleRemove = () => {
  //     if (selected.length > 1) {
  //       alert("Currently, can not remove multiple item");
  //     } else {
  //       removeCat()
  //         .then(() => {
  //           setSelected([]);
  //           alert("SUCCESS");
  //           //   enqueueSnackbar("successfully", { variant: "success" });
  //         })
  //         .catch((e) => {
  //           setSelected([]);
  //           alert(e?.message);
  //           //   enqueueSnackbar(e?.message, { variant: "error" });
  //         });
  //     }
  //   };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof GetCategory,
  ) => {
    const isAsc = options.sortBy === property && options.sortOrder === "asc";
    setOptions({
      sortOrder: isAsc ? "desc" : "asc",
      sortBy: property,
    });
  };
  //   const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const handleChangeStatus = (event: SelectChangeEvent<CategoryStatus>) => {
    setOptions({
      status: event.target.value as CategoryStatus,
    });
  };
  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <CategoryTableToolbar
        // numSelected={selected.length}
        getValueSearch={handleSearchChange}
        defaultValueSearch={options.search}
        // getValueSearchByChange={handleSearchByChange}
        valuePageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        // handleRemove={handleRemove}
        handleChange={handleChangeStatus}
        status={options.status}
        // room={options.roomFurnitures}
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
          <CategoryTableHead
            order={options.sortOrder}
            orderBy={options.sortBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {!!data &&
              data.items.map((item, index) => {
                return (
                  <CategoryTableBody
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
