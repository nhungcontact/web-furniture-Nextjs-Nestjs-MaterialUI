"use client";

import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

function CustomInput(
  props: Pick<
    TextFieldProps,
    | "children"
    | "value"
    | "onChange"
    | "label"
    | "placeholder"
    | "size"
    | "variant"
    | "color"
    | "sx"
  >,
) {
  return <TextField {...props} />;
}

export default CustomInput;
