"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import OptionDialogCreate from "./DisplayOptionDialogCreate";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function DisplayOptionHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);

  const handleOpenRFCreate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

  const handleOpenOptionValue = () => {
    router.push("/products/option-values");
  };
  return (
    <>
      <Box sx={{ px: 2, py: 1, display: "flex" }}>
        <Typography
          variant="h5"
          flexGrow={1}
        >
          {title}
        </Typography>
        {button && (
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={handleOpenRFCreate}
            sx={{ mr: 2 }}
          >
            {nameButton}
          </Button>
        )}
        <OptionDialogCreate
          handleClose={handleClose}
          open={open}
          title="Did you miss any option in our list? Please, add it!"
        />

        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleOpenOptionValue}
          sx={{ mr: 2 }}
        >
          Value
        </Button>
      </Box>
    </>
  );
}
