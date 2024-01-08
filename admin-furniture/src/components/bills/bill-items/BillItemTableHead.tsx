import { billItemHeadCells } from "@/mocks/bill-items.mock";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

// interface EnhancedTableProps {
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Bill) => void;
//   order?: Order;
//   orderBy?: string;
// }
export default function BillTableHead() {
  //   const { order, orderBy, onRequestSort } = props;
  //   const createSortHandler =
  //     (property: keyof Bill) => (event: React.MouseEvent<unknown>) => {
  //       onRequestSort(event, property);
  //     };
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
        <TableCell />
        {billItemHeadCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <Typography
              variant={"body1"}
              fontWeight={600}
              textTransform={"capitalize"}
              color="black"
              noWrap
            >
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
