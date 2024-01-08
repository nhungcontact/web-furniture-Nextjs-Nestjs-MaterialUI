"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function ReviewHeader({ title, button, nameButton }: Props) {
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
