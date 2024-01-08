/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function BillHeader({ title, button, nameButton }: Props) {
  return (
    <>
      <Box sx={{ px: 2, py: 1, display: "flex" }}>
        <Typography
          variant="h5"
          flexGrow={1}
          fontWeight="bold"
        >
          {title}
        </Typography>
      </Box>
    </>
  );
}
