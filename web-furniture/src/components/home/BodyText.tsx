'use client'
import React from 'react'
import { Typography, TypographyProps } from '@mui/material'
import useRole from '@/hooks/shared/useRole'
import { UserRole } from '@/types/user'
const BodyText = (props: TypographyProps) => {
  const [matched_owner] = useRole(UserRole.FACILITY_OWNER)
  const [matched_admin] = useRole(UserRole.ADMIN)
  if (matched_owner || matched_admin) {
    return <></>
  }
  return (
    <Typography
      variant="body1"
      sx={props.sx}
    >
      If you want to find a trustful gym facility to improve your health as well as your body fitness. You are in the right way!
    </Typography>
  )
}

export default BodyText