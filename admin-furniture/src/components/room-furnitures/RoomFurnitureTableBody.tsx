import useRoomFurnitureUpdate from "@/hooks/room-furnitures/useRoomFurnitureUpdate";
import { RoomFurniture, RoomFurnitureStatus } from "@/types/room-furniture";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useState } from "react";
import RoomDialogUpdate from "./RoomDialogUpdate";
type Props = {
  data: RoomFurniture;
  index: number;
};

export default function RoomFurnitureTableBody({ data, index }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const { trigger: update } = useRoomFurnitureUpdate(data._id);

  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleUpdate = () => {
    toggleOpen(true);
  };

  const handleAction = () => {
    update({
      body: {
        status:
          data.status === RoomFurnitureStatus.Active
            ? RoomFurnitureStatus.Inactive
            : RoomFurnitureStatus.Active,
      },
    })
      .then(() => {
        enqueueSnackbar("Hidden successfully!", {
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
          justifyContent={"start"}
        >
          <Image
            alt={data.name}
            src={data.photo.imageURL}
            width={200}
            height={150}
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
        <Typography variant="body1">{data.description}</Typography>
      </TableCell>
      <TableCell>
        <Button
          className="btn-table"
          onClick={handleUpdate}
          sx={{ mr: 3 }}
        >
          Update
        </Button>
        <Button
          className="btn-table"
          onClick={handleAction}
        >
          {data.status === RoomFurnitureStatus.Active ? "Hidden" : "Active"}
        </Button>
      </TableCell>
      <RoomDialogUpdate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
