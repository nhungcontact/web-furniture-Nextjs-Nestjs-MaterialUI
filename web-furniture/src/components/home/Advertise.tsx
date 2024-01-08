'use client'

import React from 'react'
import { Stack, Box, Typography } from '@mui/material'
import { theme, neutral } from '@/config/theme'
import useRole from '@/hooks/shared/useRole'
import { UserRole } from '@/types/user'
export default function Advertise() {
  const [matched_owner] = useRole(UserRole.FACILITY_OWNER)
  const [matched_admin] = useRole(UserRole.ADMIN)
  if (matched_owner || matched_admin) {
    return <></>
  }
  return (
    <>
      <Stack
        direction={'row'}
        spacing={6}
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          position: 'relative',
          left: '-710px',
          top: '600px',
          [theme.breakpoints.down('sm')]: {
            display: 'none'
          },
          [theme.breakpoints.between('sm', 'md')]: {
            position: 'relative',
            left: '10px',
            top: '930px',
            gap: '100px'
          },
        }}
      >
        <Box
          sx={{
            width: '137px',
            height: '88px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='h3'
            sx={{
              color: `${neutral[100]}`,
            }}
          >
            +100
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: `${neutral[200]}`,
            }}
          >
            Gym facilities
          </Typography>
        </Box>
        <Box
          sx={{
            width: '137px',
            height: '88px',
            textAlign: 'center',

          }}
        >
          <Typography
            variant='h3'
            sx={{
              color: `${neutral[100]}`,
            }}
          >
            +1200
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: `${neutral[200]}`,
            }}
          >
            Happy clients
          </Typography>
        </Box>
        <Box
          sx={{
            width: '137px',
            height: '88px',
            textAlign: 'center',

          }}
        >
          <Typography
            variant='h3'
            sx={{
              color: `${neutral[100]}`,
            }}
          >
            +50
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: `${neutral[200]}`,
            }}
          >
            Promotions
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
