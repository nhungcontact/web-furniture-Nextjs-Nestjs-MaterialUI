import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
function CustomButton(props: ButtonProps) {
  return (
    <>
      <Button
        // type='submit'
        variant="gradient"
        sx={{
          ...props.sx,
          "&:hover": {
            background: "linear-gradient(90deg, #F24B26 105%, #FFAE35 121.43%)",
          },
        }}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        size={props.size}
        type={props.type}
        onClick={props.onClick}
      >
        <Typography
          sx={{ textTransform: "none" }}
          variant="body1"
        >
          {props.children}
        </Typography>
      </Button>
    </>
  );
}

export default CustomButton;
