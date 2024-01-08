import { promotionHeadCells, promotionNumberHeadCells } from "@/mocks/promotions.mock";
import { Promotion, PromotionType } from "@/types/promotion";
import { ListOptions } from "@/types/shared";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Order } from "./PromotionTable";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Promotion) => void;
  order?: Order;
  orderBy?: string;
  options: ListOptions<Promotion>;
}
export default function BlogTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort, options } = props;
  const createSortHandler =
    (property: keyof Promotion) => (event: React.MouseEvent<unknown>) => {
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
          >
            No.
          </Typography>
        </TableCell>

        {options.type === PromotionType.Number
          ? promotionNumberHeadCells.map((headCell) => (
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
            ))
          : promotionHeadCells.map((headCell) => (
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
        <TableCell>
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
