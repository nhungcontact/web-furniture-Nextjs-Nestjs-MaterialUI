import useContactRemove from "@/hooks/contacts/useContactRemove";
import useContactUpdateStatus from "@/hooks/contacts/useContactUpdateStatus";
import { Contact, ContactStatus } from "@/types/contact";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Switch,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
// import ContactDialogReivew from "./ContactDialogReview";

type Props = {
  data: Contact;
  index: number;
};

export default function ContactTableBody({ data, index }: Props) {
  const [checked, setChecked] = useState(
    data.status === ContactStatus.Responsed ? true : false,
  );
  const { enqueueSnackbar } = useSnackbar();

  const { trigger: update } = useContactUpdateStatus(data._id);
  const { trigger: remove } = useContactRemove(data._id);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    update({
      body: {
        status: event.target.checked ? ContactStatus.Responsed : ContactStatus.NoResponse,
      },
    })
      .then(() => {
        alert("success");
      })
      .catch((e) => {
        alert(e?.message);
        setChecked(!event.target.checked);
      });
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    enqueueSnackbar(`Copied Success ${data.email}`, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
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
        <Typography variant="body1">{data.username ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.email ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.phoneNumber ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.contact ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          {checked && (
            <Chip
              variant="outlined"
              color="success"
              size="small"
              icon={<CheckOutlined />}
              label={ContactStatus.Responsed}
            />
          )}
          {!checked && (
            <Chip
              variant="outlined"
              color="error"
              size="small"
              icon={<CloseOutlined />}
              label={ContactStatus.NoResponse}
            />
          )}
        </Box>
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
          {data.status === ContactStatus.Responsed
            ? new Date(data.updatedAt).toLocaleString()
            : "No Response"}
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
        {data.status === ContactStatus.Responsed && (
          <Button
            className="btn-table"
            size="small"
            onClick={handleRemove}
          >
            Remove
          </Button>
        )}
        {data.status === ContactStatus.NoResponse && (
          <Button
            className="btn-table"
            size="small"
            onClick={handleCopyEmail}
          >
            Copy Email
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
