/* eslint-disable max-lines */
import useUserUpdate from "@/hooks/users/useUserUpdate";
import { GetUser, UserGender, UserStatus } from "@/types/user";
import { Face3Outlined, Face6Outlined, FaceOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import UserDialogCreate from "./UserDialogCreate";
type Props = {
  data: GetUser;
  index: number;
};

export default function UserTableBody({ data, index }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, toggleOpen] = useState(false);
  const { trigger: hidden } = useUserUpdate(data._id);

  const handleUpdateUser = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

  const handleAction = (name: string) => {
    hidden({
      body: {
        status: name === "active" ? UserStatus.Active : UserStatus.Inactive,
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
      <TableCell
        component="th"
        scope="row"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          textAlign={"start"}
        >
          <Avatar
            alt={data.avatar && data.avatar.name}
            src={data.avatar && data.avatar.imageURL}
            sx={{ width: "56px", height: "56px" }}
          />
          <Typography
            fontWeight={600}
            variant="body1"
            ml={2}
            noWrap
          >
            {data.username}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {data.firstName + " " + data.lastName ?? "="}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.email ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.phoneNumber ?? "-"}</Typography>
      </TableCell>

      <TableCell>
        {data.gender === UserGender.Female && (
          <Chip
            variant="outlined"
            color="warning"
            size="small"
            icon={<Face3Outlined />}
            label={UserGender.Female}
          />
        )}
        {data.gender === UserGender.Male && (
          <Chip
            variant="outlined"
            color="info"
            size="small"
            icon={<FaceOutlined />}
            label={UserGender.Male}
          />
        )}
        {data.gender === UserGender.Other && (
          <Chip
            variant="outlined"
            color="primary"
            size="small"
            icon={<Face6Outlined />}
            label={UserGender.Other}
          />
        )}
      </TableCell>
      <TableCell>
        {!!data.roles &&
          !!data.roles.length &&
          data.roles.map((item) => (
            <Typography
              key={item._id}
              variant="body1"
              noWrap
            >
              + {item.name ?? "-"}
            </Typography>
          ))}
      </TableCell>
      {data.userType === "Personnel" && (
        <TableCell>
          <Box
            display="flex"
            alignItems={"center"}
          >
            <Button
              className="btn-table"
              onClick={handleUpdateUser}
              sx={{ mr: 3 }}
            >
              Update
            </Button>
            {data.status === UserStatus.Active && (
              <Button
                className="btn-table"
                onClick={() => handleAction("Inactive")}
                size="small"
              >
                Hidden
              </Button>
            )}
            {data.status === UserStatus.Inactive && (
              <Button
                className="btn-table"
                onClick={() => handleAction("active")}
                size="small"
              >
                Active
              </Button>
            )}
          </Box>
          <UserDialogCreate
            handleClose={handleClose}
            open={open}
            data={data}
          />
        </TableCell>
      )}
      {data.userType === "Customer" && (
        <TableCell>
          <Button
            className="btn-table"
            onClick={handleUpdateUser}
          >
            View
          </Button>
          <UserDialogCreate
            handleClose={handleClose}
            open={open}
            data={data}
          />
        </TableCell>
      )}
    </TableRow>
  );
}
