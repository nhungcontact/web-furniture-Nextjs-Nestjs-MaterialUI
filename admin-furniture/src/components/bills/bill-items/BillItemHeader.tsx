"use client";
import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  button: boolean;
  nameButton?: string;
};
export default function BillItemHeader({ title, button, nameButton }: Props) {
  const router = useRouter();
  //   const [open, toggleOpen] = useState(false);

  //   const handleBillItemCreate = () => {
  //     toggleOpen(true);
  //   };
  //   const handleClose = () => {
  //     toggleOpen(false);
  //   };

  return (
    <Box>
      <Box
        display="flex"
        alignItems={"center"}
      >
        <IconButton
          onClick={() => router.push("/bills")}
          sx={{ color: "black" }}
        >
          <ArrowBack />
        </IconButton>
        <Typography> Order</Typography>
      </Box>
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
            variant="contained"
            startIcon={<Add />}
            onClick={handleBillItemCreate}
            sx={{ mr: 2 }}
            className="btn-action"
          >
            {nameButton}
          </Button>
        )}
        <BillItemDialogCreate
          handleClose={handleClose}
          open={open}
        /> */}
      </Box>
    </Box>
  );
}
