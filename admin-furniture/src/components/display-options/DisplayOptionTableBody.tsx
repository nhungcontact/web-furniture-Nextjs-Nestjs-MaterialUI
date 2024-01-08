import { DisplayOption } from "@/types/display-option";
import { Edit } from "@mui/icons-material";
import { Button, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import OptionDialogCreate from "./DisplayOptionDialogCreate";
type Props = {
  data: DisplayOption;
  onClickSelect: (event: React.MouseEvent<unknown>, id: string) => void;
  isItemSelected?: boolean;
};

export default function DisplayOptionTableBody({
  data,
  isItemSelected,
  onClickSelect,
}: Props) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    onClickSelect(event, id);
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
      tabIndex={-1}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          onClick={(event) => handleClick(event, data._id)}
        />
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
        <Typography variant="body1">{data.description}</Typography>
      </TableCell>

      <TableCell>
        <Button onClick={handleUpdate}>
          <Edit />
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
