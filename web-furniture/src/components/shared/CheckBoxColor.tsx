import { Checkbox, CheckboxProps } from '@mui/material'
import React from 'react'
export default function CheckBoxColor (
props: Pick<
    CheckboxProps,
    | "required"
    | "value"
    | "onChange"
    | "edge"
    | "checked"
    | "aria-label"
    | "defaultChecked"
    | "size"
    | "disabled"
    | "onChange"
    | "inputProps"
    | "inputRef"
    | "color"
    | "sx"
    | "id"
    | "icon"
    | "checkedIcon"
  >) {
  return (
      <Checkbox {...props}/>
  )
}
