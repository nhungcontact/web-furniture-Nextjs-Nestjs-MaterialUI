"use client";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OptionDialogCreate from "./OptionDialogCreate";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function OptionHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);

  const handleOpenRFCreate = () => {
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
  };

  const handleOpenOptionValue = () => {
    router.push("/option-values");
  };
  return (
    <>
      {/* <IconButton
        onClick={() => router.push("/products")}
        sx={{ color: "black" }}
      >
        <ArrowBack />
        <Typography> List Product</Typography>
      </IconButton> */}
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
            onClick={handleOpenRFCreate}
            sx={{ mr: 2 }}
            className="btn-action"
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
          onClick={handleOpenOptionValue}
          sx={{ mr: 2 }}
          className="btn-action"
        >
          Option Value
        </Button>
      </Box>
    </>
  );
}
