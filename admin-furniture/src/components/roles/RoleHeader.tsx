"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import RoleDialogCreate from "./RoleDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function RoleHeader({ title, button, nameButton }: Props) {
  const [open, toggleOpen] = useState(false);
  const handleRoleCreate = () => {
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
            onClick={handleRoleCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <RoleDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
