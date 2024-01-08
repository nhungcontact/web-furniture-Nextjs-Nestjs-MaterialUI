"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import BlogDialogCreate from "./BlogDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function BlogHeader({ title, button, nameButton }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const handleBlogCreate = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            onClick={handleBlogCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <BlogDialogCreate
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </>
  );
}
