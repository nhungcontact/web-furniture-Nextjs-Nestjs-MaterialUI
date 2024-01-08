import { Select, SelectProps } from '@mui/material'
import React from 'react'

export default function SelectWithoutLabel (
{
  ...props
}: Pick<
  SelectProps,
  |"children"
  | "defaultChecked"
  | "defaultOpen"
  | "displayEmpty"
  | "IconComponent"
  | "open"
  | "disableUnderline"
  | "disabled"
  | "label"
  | "sx"
  | "id"
  | "inputProps"
  | "color"
  | "onChange"
  | "value"
//   | "defaultValue"
  | "variant"
>
) {
  
  return (
    <Select
      {...props}
      
      inputProps={{ 'aria-label': 'Without label' }}
    >
      {props.children}
    </Select>
  )
}
