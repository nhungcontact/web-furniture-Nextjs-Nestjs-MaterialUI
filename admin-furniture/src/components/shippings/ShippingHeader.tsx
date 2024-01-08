"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ShippingDialogCreate from "./ShippingDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function ShippingHeader({ title, button, nameButton }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleShippingCreate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

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

        {button && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleShippingCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <ShippingDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
