import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";

function CustomButtonOutline(props: ButtonProps) {
  return (
    <>
      <Button
        variant="outline_gradient"
        sx={props.sx}
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

export default CustomButtonOutline;
