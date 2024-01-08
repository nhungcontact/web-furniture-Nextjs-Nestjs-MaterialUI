"use client";
// import { primary } from "@/config/theme";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import UserDialogCreate from "./UserDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function UserHeader({ title, button, nameButton }: Props) {
  //   const router = useRouter();
  const [open, toggleOpen] = useState(false);

  const handleUserCreate = () => {
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
            onClick={handleUserCreate}
            sx={{
              mr: 2,
              //   background: primary[50],
              //   color: primary[800],
              //   ":hover": { background: primary[50], color: primary[800] },
            }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <UserDialogCreate
          handleClose={handleClose}
          open={open}
        />
      </Box>
    </>
  );
}
