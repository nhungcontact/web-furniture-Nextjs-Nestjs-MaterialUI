"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import GroupPermissionDialogCreate from "./GroupPermissionDialogCreate";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function PermissionHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);
  const handleGroupPermissionCreate = () => {
    toggleOpen(true);
  };

  const handleClose = () => {
    toggleOpen(false);
  };

  const handlePermission = () => {
    router.push("/permissions");
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
            onClick={handleGroupPermissionCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}

        <GroupPermissionDialogCreate
          handleClose={handleClose}
          open={open}
        />
        <Button
          variant="outlined"
          onClick={handlePermission}
          sx={{ mr: 2 }}
          className="btn-action"
        >
          Permission
        </Button>
      </Box>
    </>
  );
}
