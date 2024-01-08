import { Radio, RadioProps } from '@mui/material'
import React from 'react'
export default function RadioColor (
props: Pick<
    RadioProps,
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
      <Radio {...props}/>
  )
}
