"use client";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import ProductDetailDialogUpdate from "../edit/ProductDetailDialogUpdate";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  nameButton?: string;
};
export default function ProductDetailHeader({ title, nameButton }: Props) {
  const router = useRouter();
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleProductDetailCreate = () => {
    toggleOpen(true);
  };

  const handleOpenOption = () => {
    router.push("/products/options");
  };
  const handleOpenOptionValue = () => {
    router.push("/products/option-values");
  };
  return (
    <>
      <IconButton
        onClick={() => router.push("/products")}
        sx={{ color: "black" }}
      >
        <ArrowBack />
        <Typography> List Product</Typography>
      </IconButton>

      <Box sx={{ px: 2, py: 1, display: "flex" }}>
        <Typography
          variant="h5"
          flexGrow={1}
          fontWeight="bold"
        >
          {title}
        </Typography>
        {/* {button && (
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
        /> */}

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleProductDetailCreate}
          sx={{ mr: 2 }}
          className="btn-action"
        >
          Add Product detail
        </Button>

        <ProductDetailDialogUpdate
          handleClose={handleClose}
          open={open}
        />

        <Button
          variant="outlined"
          onClick={handleOpenOption}
          sx={{ mr: 2, width: "120px" }}
          className="btn-action"
          size="small"
        >
          Option
        </Button>
        <Button
          variant="outlined"
          onClick={handleOpenOptionValue}
          sx={{ width: "120px" }}
          className="btn-action"
          size="small"
        >
          Option value
        </Button>
      </Box>
    </>
  );
}
