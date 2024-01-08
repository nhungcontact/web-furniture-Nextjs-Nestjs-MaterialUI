import { GetWarehouseReceipt, WRStatus } from "@/types/warehouse-receipt";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import WarehouseReceiptFormCreate from "./WarehouseReceiptDialogCreate";
import WarehouseReceiptReviewDialog from "./WarehouseReceiptReviewDialog";
import useWarehouseReceiptAddWRD from "@/hooks/warehouse-receipts/useWarehouseReceiptAddWRD";
import useReviewUpdate from "@/hooks/reviews/useReviewUpdate";

type Props = {
  data: GetWarehouseReceipt;
  index: number;
};

export default function WarehouseReceiptTableBody({ data, index }: Props) {
  //   const { trigger: remove } = useWarehouseReceiptRemove(data._id);
  const [open, toggleOpen] = useState(false);
  const [openUpdate, toggleOpenUpdate] = useState(false);
  const [openRemove, toggleOpenRemove] = useState(false);
  const { trigger: update } = useReviewUpdate(data._id);

  const handleAction = (action: string) => {
    if (action === "review") {
      toggleOpen(true);
    } else if (action === "update") {
      toggleOpenUpdate(true);
    } else {
      toggleOpenRemove(true);
    }
  };
  const handleClose = () => {
    toggleOpen(false);
    toggleOpenUpdate(false);
  };
  const handleUpdate = () => {};
  //   const handleRemove = () => {
  //     remove()
  //       .then(() => {
  //         console.log("success");
  //       })
  //       .catch((e) => console.log(e?.message));
  //   };
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
          variant="body1"
          noWrap
        >
          {index + 1 ?? ""}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.user.email ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.provider.email ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.totalPrice ?? 0)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.note ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.createdAt ? new Date(data.createdAt).toLocaleString() : "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.confirmationDate
            ? new Date(data.confirmationDate).toLocaleString()
            : "No Confirm"}
        </Typography>
      </TableCell>

      <TableCell>
        {data.status === WRStatus.Approved && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={WRStatus.Approved}
          />
        )}
        {data.status === WRStatus.UnApproved && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={WRStatus.UnApproved}
          />
        )}
      </TableCell>
      <TableCell
        sx={{
          border: "none",
          position: "sticky",
          bgcolor: "background.default",
          right: 0,
          minWidth: "150px",
        }}
      >
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {data.status === WRStatus.UnApproved && (
            <>
              <Button
                className="btn-table"
                sx={{ mr: 3 }}
                onClick={() => handleAction("review")}
              >
                Review
              </Button>
              <Button
                className="btn-table"
                sx={{ mr: 3 }}
                onClick={() => handleAction("remove")}
              >
                Remove
              </Button>
              <Button
                className="btn-table"
                sx={{ mr: 3 }}
                onClick={() => handleAction("update")}
              >
                Update
              </Button>
            </>
          )}

          {data.status === WRStatus.Approved && (
            <Button
              className="btn-table"
              sx={{ mr: 3 }}
              //   onClick={() => handleAction("update")}
            >
              View
            </Button>
          )}
        </Box>
      </TableCell>
      <WarehouseReceiptReviewDialog
        data={data}
        open={open}
        handleClose={handleClose}
      />
      <WarehouseReceiptFormCreate
        data={data}
        open={openUpdate}
        handleClose={handleClose}
      />
    </TableRow>
  );
}
