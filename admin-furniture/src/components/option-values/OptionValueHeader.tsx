"use client";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import OptionValueDialogCreate from "./OptionValueDialogCreate";
import { useRouter } from "next-intl/client";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function OptionValueHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);

  const handleOpenOVCreate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={() => router.push("/options")}
        sx={{ color: "black" }}
      >
        <ArrowBack />
        <Typography> List Option</Typography>
      </IconButton>
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
            onClick={handleOpenOVCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <OptionValueDialogCreate
          handleClose={handleClose}
          open={open}
          title="Did you miss any option in our list? Please, add it!"
        />
      </Box>
    </>
  );
}
