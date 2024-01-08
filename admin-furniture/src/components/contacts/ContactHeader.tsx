"use client";
import { Box, Typography } from "@mui/material";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function ShippingHeader({ title, button, nameButton }: Props) {
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
