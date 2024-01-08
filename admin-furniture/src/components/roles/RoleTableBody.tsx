import { GetRole } from "@/types/role";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import RoleDialogCreate from "./RoleDialogCreate";

type Props = {
  data: GetRole;
  index: number;
};

export default function BlogTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleUpdate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
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
        <Typography variant="body1">{data.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.description ?? "="}</Typography>
      </TableCell>
      <TableCell>
        {data &&
          data.permissions &&
          data.permissions.map((item) => (
            <Typography
              key={item._id}
              variant="body1"
            >
              {item.name ?? "-"}
            </Typography>
          ))}
      </TableCell>
      <TableCell>
        <Button
          className="btn-table"
          onClick={handleUpdate}
          sx={{ mr: 3 }}
        >
          Update
        </Button>
      </TableCell>
      <RoleDialogCreate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
