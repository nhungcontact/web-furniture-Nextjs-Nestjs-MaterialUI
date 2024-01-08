import { BlogStatus, GetBlog } from "@/types/blog";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import BlogDialogCreate from "./BlogDialogCreate";
import BlogDialogReview from "./BlogDialogReview";
// import BlogDialogUpdate from "./BlogDialogUpdate";
type Props = {
  data: GetBlog;
  index: number;
};

export default function BlogTableBody({ data, index }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [openUpdate, setOpenUpdate] = useState<boolean>(false);

  const handleOpenUpdate = (name: string) => {
    if (name === "update") {
      setOpenUpdate(true);
    } else {
      setOpen(true);
    }
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleReviewBlog = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        <Typography variant="body1">{index + 1}</Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          textAlign={"start"}
        >
          <Image
            alt={data.photo.name ?? "-"}
            src={data.photo.imageURL ?? "/"}
            width={120}
            height={80}
            unoptimized
          />
          <Typography
            fontWeight={600}
            variant="body1"
            ml={2}
            noWrap
          >
            {data.name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.user.email ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.category.name ?? "="}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body1">{data.roomFurniture.name ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.actor ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.description ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            width: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.content ?? "-"}
        </Typography>
      </TableCell>
      {/* <TableCell>
        {data.status === BlogStatus.Approved && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={BlogStatus.Approved}
          />
        )}
        {data.status === BlogStatus.UnApproved && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={BlogStatus.UnApproved}
          />
        )}
      </TableCell> */}
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
          {data.status === BlogStatus.Approved
            ? new Date(data.updatedAt).toLocaleString()
            : "No Review"}
        </Typography>
      </TableCell>
      <TableCell
        sx={{
          border: "none",
          position: "sticky",
          bgcolor: "#f8f8f8",
          right: 0,
          minWidth: "150px",
        }}
      >
        <Box
          display="flex"
          alignItems={"center"}
        >
          <Button
            onClick={() => handleOpenUpdate("update")}
            className="btn-table"
            variant="contained"
            size="small"
            sx={{ mr: 3 }}
          >
            Update
          </Button>

          <Button
            onClick={() => handleOpenUpdate("review")}
            className="btn-table"
            variant="contained"
            size="small"
          >
            {data.status === BlogStatus.UnApproved ? "Review" : "View"}
          </Button>

          {data.status === BlogStatus.UnApproved && (
            <Button
              className="btn-table"
              variant="contained"
              size="small"
              sx={{ mr: 3 }}
            >
              Remove
            </Button>
          )}
        </Box>
        <BlogDialogReview
          data={data}
          handleClose={handleClose}
          open={open}
        />
        <BlogDialogCreate
          data={data}
          handleClose={handleCloseUpdate}
          open={openUpdate}
        />
      </TableCell>
    </TableRow>
  );
}
