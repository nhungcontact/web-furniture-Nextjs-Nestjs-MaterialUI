import { Button, ButtonProps, Typography } from "@mui/material";
import React from "react";
function ChipButton(props: ButtonProps) {
  return (
    <>
      <Button variant="outline_chip" sx={props.sx}>
          <Typography variant="caption"> 
          {props.children}
        </Typography>
      </Button>
    </>
  )
}

export default ChipButton;
