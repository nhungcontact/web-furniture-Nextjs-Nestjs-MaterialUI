import { GroupPermission } from "@/types/group-permission";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import GroupPermissionDialogCreate from "./GroupPermissionDialogCreate";
// import BlogDialogUpdate from "./BlogDialogUpdate";
type Props = {
  data: GroupPermission;
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
      <TableCell>
        <Typography variant="body1">{data.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.description ?? "="}</Typography>
      </TableCell>
      <TableCell>
        {data.permissions &&
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
          onClick={handleUpdate}
          className="btn-table"
          size="small"
        >
          Update
        </Button>
      </TableCell>
      <GroupPermissionDialogCreate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
