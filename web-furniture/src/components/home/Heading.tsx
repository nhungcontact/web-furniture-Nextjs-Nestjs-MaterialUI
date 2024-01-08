"use client";
import React from 'react'
import { Box, Typography } from '@mui/material'
import { neutral, theme } from '@/config/theme'
import useRole from '@/hooks/shared/useRole';
import { UserRole } from '@/types/user';
const Heading = () => {
  const [matched_owner] = useRole(UserRole.FACILITY_OWNER)
  const [matched_admin] = useRole(UserRole.ADMIN)
  if (matched_owner || matched_admin) {
    return (
      <Box sx={{ mt: { xs: '150px', md: '100px' } }}>
        <Typography
          variant="h1"
          sx={{
            color: `${neutral[50]}`,
            textAlign: "center",
            mb: 2,
            display: 'inline',
            [theme.breakpoints.down('md')]: {
              fontSize: '69px'
            }
          }}
        >
          Welcome Back, {''}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: 'primary.main',
            textAlign: "center",
            mb: 2,
            display: 'inline',
            [theme.breakpoints.down('md')]: {
              fontSize: '69px'
            }
          }}
        >
          {matched_owner ? "Owner!" : "Admin!"}
        </Typography>
      </Box>
    )
  }
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          color: `${neutral[50]}`,
          textAlign: "center",
          mb: 2,
          display: 'inline',
          [theme.breakpoints.down('md')]: {
            fontSize: '69px'
          }
        }}
      >
        Train {''}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: 'primary.main',
          textAlign: "center",
          mb: 2,
          display: 'inline',
          [theme.breakpoints.down('md')]: {
            fontSize: '69px'
          }
        }}
      >
        hard
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: `${neutral[50]}`,
          textAlign: "center",
          mb: 2,
          display: 'inline',
          [theme.breakpoints.down('md')]: {
            fontSize: '69px'
          }
        }}
      >
        , stay {''}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          color: 'primary.main',
          textAlign: "center",
          mb: 2,
          display: 'inline',
          [theme.breakpoints.down('md')]: {
            fontSize: '69px'
          }
        }}
      >focused</Typography>
      <Typography
        variant="h1"
        sx={{
          color: `${neutral[50]}`,
          textAlign: "center",
          mb: 2,
          display: 'inline',
          [theme.breakpoints.down('md')]: {
            fontSize: '69px'
          }
        }}
      >
        , and make it happen
      </Typography>
    </>
  )
}

export default Heading