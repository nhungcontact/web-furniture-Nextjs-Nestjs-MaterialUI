"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ProviderDialogCreate from "./ProviderDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function ProviderHeader({ title, button, nameButton }: Props) {
  const [open, toggleOpen] = useState(false);

  const handleProviderCreate = () => {
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
            onClick={handleProviderCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <ProviderDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
