import { GetOptionValue } from "@/types/option-value";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import OptionValueDialogCreate from "./OptionValueDialogCreate";
type Props = {
  data: GetOptionValue;
  index: number;
};

export default function OptionValueTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleUpdate = () => {
    toggleOpen(true);
  };
  return (
    <TableRow
      hover
      sx={{
        "&:last-of-type td, &:last-of-type th": {
          border: 0,
        },
      }}
    >
      <TableCell>
        <Typography variant="body1">{index + 1}</Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
      >
        <Typography
          fontWeight={600}
          variant="body1"
          ml={2}
          noWrap
        >
          {data.name ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.optionSku.name ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Button
          className="btn-table"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </TableCell>
      <OptionValueDialogCreate
        handleClose={handleClose}
        open={open}
        title="Update value it!"
        data={data}
      />
    </TableRow>
  );
}
