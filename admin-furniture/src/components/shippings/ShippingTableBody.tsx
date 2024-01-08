import { Shipping } from "@/types/shipping";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import ShippingDialogCreate from "./ShippingDialogCreate";

type Props = {
  data: Shipping;
  index: number;
};

export default function ShippingTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleUpdateShipping = () => {
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
        <Typography variant="body1">{data.provinceApply ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.price) ?? "-"}
        </Typography>
      </TableCell>
      {/* <TableCell>
        {data.status === ShippingStatus.Active && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={ShippingStatus.Active}
          />
        )}
        {data.status === ShippingStatus.Inactive && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={ShippingStatus.Inactive}
          />
        )}
      </TableCell> */}
      <TableCell>
        <Box
          display="flex"
          alignItems={"center"}
        >
          <Button
            className="btn-table"
            onClick={handleUpdateShipping}
            sx={{ mr: 3 }}
          >
            Update
          </Button>
          <Button
            className="btn-table"
            // onClick={handleUpdateShipping}
          >
            Remove
          </Button>
        </Box>
      </TableCell>
      <ShippingDialogCreate
        data={data}
        open={open}
        handleClose={handleClose}
      />
    </TableRow>
  );
}
