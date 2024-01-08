import { Button, ButtonProps } from '@mui/material'
import React from 'react'

export default function BasicButton (
  props: Pick<
    ButtonProps,
    | "color"
    | "disabled"
    | "endIcon"
    | "fullWidth"
    | "size"
    | "startIcon"
    | "sx"
    | "variant"
    | "onChange"
    | "onClick"
    | "children"
  >
) {
  return (
    <>
      <Button {...props}>{props.children}</Button>
    </>
  )
}
