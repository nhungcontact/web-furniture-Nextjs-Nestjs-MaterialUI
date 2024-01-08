"use client";
import { Add, ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function ProductHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const handleProductCreate = () => {
    router.push("/products/create");
  };
  const handleOpenOption = () => {
    router.push("/products/options");
  };
  const handleOpenOptionValue = () => {
    router.push("/products/option-values");
  };

  return (
    <>
      {pathName === "/vi/products/create" && (
        <IconButton
          onClick={() => router.push("/products")}
          sx={{ color: "black" }}
        >
          <ArrowBack />
          <Typography> List Product</Typography>
        </IconButton>
      )}

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
            onClick={handleProductCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}

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
