import { Box, Checkbox, TableCell, TableHead, TableRow, Typography } from "@mui/material";

const catHeadCells = [
  {
    id: "1",
    label: "Name",
  },
  {
    id: "2",
    label: "Unit price",
  },
  {
    id: "3",
    label: "Variant",
  },
  {
    id: "4",
    label: "Quantity",
  },
  {
    id: "5",
    label: "Total price",
  },
];
interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}
export default function CategoryTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Box
            display={"flex"}
            alignItems={"center"}
          >
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
            <Typography
              variant={"body2"}
              fontWeight={"bold"}
              textTransform={"capitalize"}
              color="black"
              noWrap
            >
              Product
            </Typography>
          </Box>
        </TableCell>
        {catHeadCells.map((headCell) => (
          <TableCell
            align="center"
            key={headCell.id}
          >
            <Typography
              variant={"body2"}
              fontWeight={"bold"}
              textTransform={"capitalize"}
              color="black"
              noWrap
            >
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
}
