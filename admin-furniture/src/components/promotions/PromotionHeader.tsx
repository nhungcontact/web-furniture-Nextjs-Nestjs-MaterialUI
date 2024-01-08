"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import PromotionDialogCreate from "./PromotionDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function PromotionHeader({ title, button, nameButton }: Props) {
  const [open, toggleOpen] = useState(false);

  const handlePromotionCreate = () => {
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
            variant="outlined"
            startIcon={<Add />}
            sx={{ mr: 2 }}
            onClick={handlePromotionCreate}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <PromotionDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
