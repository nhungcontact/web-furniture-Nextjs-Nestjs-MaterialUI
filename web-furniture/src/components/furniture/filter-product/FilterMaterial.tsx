import React from 'react';
import { IconButton, List, ListItem, ListItemText, Typography, styled } from '@mui/material'
import { usePathname } from 'next/navigation';
import { primary } from '@/config/theme';
import MuiListItemButton from '@mui/material/ListItemButton';
const ListItemButton = styled(MuiListItemButton)({
    "&.Mui-selected": {
      background:"none",
    },
  //   "&.Mui-selected .MuiListItemIcon-root": {
  //     color: "orangered",
  //   },
    "&.MuiButtonBase-root:hover": {
      background: "none",
      color:`${primary[400]}`
    },
    "&.Mui-selected .MuiListItemText-root .MuiTypography-root": {
      fontWeight:"600",
      color:`${primary[400]}`,
    }
})
export const FilterMaterial = () => {
  const pathName = usePathname();
  return (
    <>
      <List>
        <ListItem disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <Typography color={"black"}>300</Typography>
            </IconButton>
          }
        >
          <ListItemButton 
            selected={pathName === "/vi/furniture" ? true : false} >
            <ListItemText primary="All" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding 
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <Typography color={"black"}>300</Typography>
            </IconButton>
          }
        >
          <ListItemButton>
            <ListItemText primary="Room 1" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding
          secondaryAction={
            <IconButton edge="end" aria-label="comments">
              <Typography color={"black"}>300</Typography>
            </IconButton>
          }
        >
          <ListItemButton>
            <ListItemText primary="Room 2" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}
