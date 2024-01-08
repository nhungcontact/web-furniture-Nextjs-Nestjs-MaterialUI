import { Option } from "@/types/option";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import OptionDialogCreate from "./OptionDialogCreate";
type Props = {
  data: Option;
  index: number;
};

export default function OptionTableBody({ data, index }: Props) {
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
      <TableCell align="center">
        <Typography variant="body1">{index + 1}</Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="center"
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

      <TableCell align="center">
        {/* {data &&
          data.optionValues &&
          data.optionValues.map((item) => (
            <Typography
              key={item._id}
              variant="body2"
            >
              - {item.name}
            </Typography>
          ))} */}
        <Typography variant="body1">{data?.optionValues?.length ?? 0}</Typography>
      </TableCell>

      <TableCell>
        <Button
          className="btn-table"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </TableCell>
      <OptionDialogCreate
        handleClose={handleClose}
        open={open}
        title="Update it!"
        data={data}
      />
    </TableRow>
  );
}
