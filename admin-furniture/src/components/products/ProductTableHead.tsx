import { headCells } from "@/mocks/products.mock";
import { Product } from "@/types/product";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./ProductTable";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
  order?: Order;
  orderBy?: string;
}
export default function ProductTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow
        sx={{
          "& .MuiTableCell-head": {
            color: "black",
            backgroundColor: "white",
          },
        }}
      >
        <TableCell align="center">
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
            noWrap
          >
            No.
          </Typography>{" "}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant={"body1"}
                fontWeight={600}
                textTransform={"capitalize"}
                color="black"
                noWrap
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box
                  component="span"
                  sx={visuallyHidden}
                >
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
            noWrap
          >
            Product Details
          </Typography>{" "}
        </TableCell>
        <TableCell align="center">
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
            noWrap
          >
            Total Quantity
          </Typography>{" "}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            border: "none",
            position: "sticky",
            bgcolor: "background.default",
            right: 0,
            minWidth: "150px",
          }}
        >
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
            noWrap
          >
            Actions
          </Typography>{" "}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
