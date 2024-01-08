import { CommentStatus, GetComment } from "@/types/comment";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import CommentDialogReivew from "./CommentDialogReview";
import useCommentRemove from "@/hooks/comments/useCommentRemove";
import { useSnackbar } from "notistack";

type Props = {
  data: GetComment;
  index: number;
};

export default function CommentTableBody({ data, index }: Props) {
  //   const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [openReview, setOpenReview] = useState<boolean>(false);
  const { trigger: remove } = useCommentRemove(data._id);
  const { enqueueSnackbar } = useSnackbar();

  const handleCloseAlert = (name: string) => {
    if (name === "review") {
      setOpenReview(false);
    }
  };

  const handleUpdateComment = () => {
    setOpenReview(true);
  };

  const handleRemove = () => {
    remove()
      .then(() => {
        enqueueSnackbar("successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      })
      .catch((e) => {
        enqueueSnackbar(e?.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
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
        <Typography variant="body1">{index + 1 ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.user.email ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.blog.name ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.comment ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        {data.status === CommentStatus.Approved && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={CommentStatus.Approved}
          />
        )}
        {data.status === CommentStatus.UnApproved && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={CommentStatus.UnApproved}
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
          {data.status === CommentStatus.Approved
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
        <Box className="display-sb">
          <Button
            className="btn-table"
            size="small"
            onClick={handleUpdateComment}
            sx={{ mr: data.status === CommentStatus.UnApproved ? 3 : 0 }}
          >
            {data.status === CommentStatus.UnApproved ? "Review" : "View"}
          </Button>
          {data.status === CommentStatus.UnApproved && (
            <Button
              className="btn-table"
              size="small"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </Box>

        {/* <DialogAlert
            handleCloseAlert={handleCloseAlert}
            openAlert={openAlert}
            content="Remove review"
            title="Remove review"
          /> */}
        {/* review */}
        <CommentDialogReivew
          openReview={openReview}
          handleCloseAlert={handleCloseAlert}
          data={data}
        />
      </TableCell>
    </TableRow>
  );
}
