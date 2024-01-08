import React from "react";
import { Pagination, Box } from "@mui/material";
interface Props {
  count: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
}
export const PaginationComp = ({ count, handleChangePage, page }: Props) => {
  return (
    <Box
      p="24px 0 36px"
      display="flex"
      justifyContent="center"
    >
      <Pagination
        count={count}
        shape="rounded"
        onChange={handleChangePage}
        page={page}
      />
    </Box>
  );
};
