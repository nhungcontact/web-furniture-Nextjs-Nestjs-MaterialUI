"use client";

import { Button, ButtonProps } from "@mui/material";
import React from "react";

function CustomButton(
  props: Pick<
    ButtonProps,
    | "children"
    | "onClick"
    | "sx"
    | "variant"
    | "color"
    | "size"
    | "ref"
    | "type"
    | "LinkComponent"
    | "href"
  >,
) {
  return <Button {...props} />;
}

export default CustomButton;
