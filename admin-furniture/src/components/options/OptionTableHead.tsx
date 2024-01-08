import { optionHeadCells } from "@/mocks/options.mock";
import { Option } from "@/types/option";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./OptionTable";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Option) => void;
  order?: Order;
  orderBy?: string;
}
export default function OptionTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Option) => (event: React.MouseEvent<unknown>) => {
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
            align="center"
          >
            No.
          </Typography>
        </TableCell>
        {optionHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
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
          >
            Option values
          </Typography>{" "}
        </TableCell>
        <TableCell>
          <Typography
            variant={"body1"}
            fontWeight={600}
            textTransform={"capitalize"}
            color="black"
          >
            Actions
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
