import { Provider, ProviderStatus } from "@/types/provider";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import ProviderDialogCreate from "./ProviderDialogCreate";
type Props = {
  data: Provider;
  index: number;
};

export default function ProviderTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleUpdateProvider = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <TableRow
      sx={{
        "&:last-of-type td, &:last-of-type th": {
          border: 0,
        },
      }}
    >
      <TableCell>
        <Typography
          fontWeight={600}
          variant="body1"
          ml={2}
          noWrap
        >
          {index + 1}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          fontWeight={600}
          variant="body1"
          ml={2}
          noWrap
        >
          {data.name}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.email ?? "="}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.phoneNumber ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.address?.addressDetail +
            ", " +
            data.address?.commune +
            ", " +
            data.address?.district +
            ", " +
            data.address?.province ?? "-"}
        </Typography>
      </TableCell>

      <TableCell>
        {data.status === ProviderStatus.Active && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={ProviderStatus.Active}
          />
        )}
        {data.status === ProviderStatus.Inactive && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={ProviderStatus.Inactive}
          />
        )}
      </TableCell>
      <TableCell>
        <Box
          display="flex"
          alignItems="center"
        >
          <Button
            className="btn-table"
            onClick={handleUpdateProvider}
            sx={{ mr: 3 }}
          >
            Update
          </Button>
          <Button
            className="btn-table"
            onClick={handleUpdateProvider}
          >
            {data.status === ProviderStatus.Active ? "Hidden" : "Active"}
          </Button>
        </Box>
        <ProviderDialogCreate
          handleClose={handleClose}
          open={open}
          data={data}
        />
      </TableCell>
    </TableRow>
  );
}
