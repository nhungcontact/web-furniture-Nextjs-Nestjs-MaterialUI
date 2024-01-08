import { GetCategory } from "@/types/category";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CategoryDialogUpdate from "./CategoryDialogUpdate";
type Props = {
  data: GetCategory;
  index: number;
};

export default function CategoryTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };
  //   const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
  //     onClickSelect(event, id);
  //   };
  const handleUpdate = () => {
    toggleOpen(true);
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
      </TableCell>
      <CategoryDialogUpdate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
