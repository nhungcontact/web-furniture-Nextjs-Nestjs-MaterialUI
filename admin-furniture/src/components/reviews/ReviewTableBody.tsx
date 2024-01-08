import { GetReview, ReviewStatus } from "@/types/review";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import DialogAlert from "../shared/DialogAlert";
import ReviewDialogReivew from "./ReviewDialogReview";

type Props = {
  data: GetReview;
  index: number;
};

export default function ReviewTableBody({ data, index }: Props) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState<boolean>(false);

  const handleCloseAlert = (name: string) => {
    if (name === "review") {
      setOpenReview(false);
    }
  };

  const handleUpdateReview = () => {
    setOpenReview(true);
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
        <Typography
          variant="body1"
          noWrap
        >
          {data.user.firstName + " " + data.user.lastName ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.productSku.product.name ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.content ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.rating + " start" ?? "-"}
        </Typography>
      </TableCell>

      <TableCell>
        {data.status === ReviewStatus.Approved && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={ReviewStatus.Approved}
          />
        )}
        {data.status === ReviewStatus.UnApproved && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={ReviewStatus.UnApproved}
          />
        )}
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {new Date(data.createdAt).toLocaleString() ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {data.status === ReviewStatus.Approved
            ? new Date(data.updatedAt).toLocaleString()
            : "No Review"}
        </Typography>
      </TableCell>

      <TableCell>
        <Box
          display="flex"
          alignItems={"center"}
        >
          <Button
            className="btn-table"
            size="small"
            onClick={handleUpdateReview}
            sx={{ mr: 3 }}
          >
            {data.status === ReviewStatus.UnApproved ? "Review" : "View"}
          </Button>
          {data.status === ReviewStatus.UnApproved && (
            <Button
              className="btn-table"
              size="small"
            >
              Remove
            </Button>
          )}
        </Box>
        <DialogAlert
          handleCloseAlert={handleCloseAlert}
          openAlert={openAlert}
          content="Remove review"
          title="Remove review"
        />
        {/* review */}
        <ReviewDialogReivew
          openReview={openReview}
          handleCloseAlert={handleCloseAlert}
          data={data}
        />
      </TableCell>
    </TableRow>
  );
}
