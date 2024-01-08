"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PermissionDialogCreate from "./PermissionDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function PermissionHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);
  const handlePermissionCreate = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };
  const handleGroupPermission = () => {
    router.push("/permissions/group-permissions");
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
            onClick={handlePermissionCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <PermissionDialogCreate
          handleClose={handleClose}
          open={open}
        />
        <Button
          variant="outlined"
          onClick={handleGroupPermission}
          sx={{ mr: 2 }}
          className="btn-action"
        >
          Group Permission
        </Button>
      </Box>
    </>
  );
}
