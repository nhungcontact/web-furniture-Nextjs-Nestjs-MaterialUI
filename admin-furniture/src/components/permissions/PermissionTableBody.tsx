import { GetPermission, PermissionStatus } from "@/types/permission";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import PermissionDialogCreate from "./PermissionDialogCreate";
import usePermissionUpdate from "@/hooks/permissions/usePermissionUpdate";
import { useSnackbar } from "notistack";
// import BlogDialogUpdate from "./BlogDialogUpdate";
type Props = {
  data: GetPermission;
  index: number;
};

export default function BlogTableBody({ data, index }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, toggleOpen] = useState(false);
  const { trigger: update } = usePermissionUpdate(data ? data._id : "");

  const handleUpdate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

  const handleAction = (name: string) => {
    update({
      body: {
        status: name === "active" ? PermissionStatus.Active : PermissionStatus.Inactive,
      },
    })
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
          variant: "success",
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
        <Typography variant="body1">{data.groupPermission.name ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        {data.status === PermissionStatus.Active && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={PermissionStatus.Active}
          />
        )}
        {data.status === PermissionStatus.Inactive && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={PermissionStatus.Inactive}
          />
        )}
      </TableCell>
      <TableCell>
        <Box
          display="flex"
          alignItems={"center"}
        >
          <Button
            className="btn-table"
            onClick={handleUpdate}
            size="small"
            sx={{ mr: 3 }}
          >
            Update
          </Button>

          {data.status === PermissionStatus.Active && (
            <Button
              className="btn-table"
              onClick={() => handleAction("Inactive")}
              size="small"
            >
              Hidden
            </Button>
          )}
          {data.status === PermissionStatus.Inactive && (
            <Button
              className="btn-table"
              onClick={() => handleAction("active")}
              size="small"
            >
              Active
            </Button>
          )}
        </Box>
      </TableCell>
      <PermissionDialogCreate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
