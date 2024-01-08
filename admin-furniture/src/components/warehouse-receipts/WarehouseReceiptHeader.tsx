"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import WarehouseReceiptDialogCreate from "./WarehouseReceiptDialogCreate";
import { useState } from "react";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function WarehouseReceiptHeader({ title, button, nameButton }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleWarehouseReceiptCreate = () => {
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
            sx={{ mr: 2 }}
            onClick={handleWarehouseReceiptCreate}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <WarehouseReceiptDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
