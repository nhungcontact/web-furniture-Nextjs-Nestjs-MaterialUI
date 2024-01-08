import { GetBlog } from "@/types/blog";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./BlogTable";
import { blogHeadCells } from "@/mocks/blogs.mock";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof GetBlog) => void;
  order?: Order;
  orderBy?: string;
}
export default function BlogTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof GetBlog) => (event: React.MouseEvent<unknown>) => {
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
        <TableCell>
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
            noWrap
          >
            No.
          </Typography>
        </TableCell>
        {blogHeadCells.map((headCell) => (
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
        <TableCell
          sx={{
            border: "none",
            position: "sticky",
            bgcolor: "#f8f8f8",
            right: 0,
            minWidth: "150px",
          }}
        >
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
          >
            Actions
          </Typography>{" "}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
