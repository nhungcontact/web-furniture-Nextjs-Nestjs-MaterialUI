import { useTheme } from "@mui/material/styles";
import DrawerHeader from "./DrawerHeaderStyled";
import { Drawer, IconButton, SvgIcon, useMediaQuery, Box } from "@mui/material";
import DrawerStyled from "./DrawerStyled";
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import DrawerContent from "./DrawerContent";
import { Close } from "@mui/icons-material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { useRouter } from "next/navigation";
import Logo from "./app-bar/Logo";
// import { useState } from 'react';

type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
};
export default function MainDrawer({ open, handleDrawerToggle, drawerWidth }: Props) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
  const router = useRouter();
  return (
    <>
      {!matchDownMD ? (
        <DrawerStyled
          open={open}
          variant="permanent"
        >
          <DrawerHeaderStyled sx={{ justifyContent: "space-between" }}>
            <IconButton
              sx={{ marginLeft: "10px", ":hover": { background: "none" } }}
              edge={"start"}
            >
              {open && <Logo />}
              {!open && (
                <SvgIcon
                  color="primary"
                  onClick={() => router.push("/")}
                >
                  <FitbitIcon />
                </SvgIcon>
              )}
            </IconButton>
          </DrawerHeaderStyled>
          <Box sx={{ paddingX: open ? 3 : 1 }}>
            <DrawerContent openDrawer={open} />
          </Box>
        </DrawerStyled>
      ) : (
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundImage: "none",
              boxShadow: "inherit",
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          <DrawerHeader sx={{ justifyContent: "space-between" }}>
            <IconButton
              sx={{ marginLeft: "10px", ":hover": { background: "none" } }}
              edge={"start"}
            >
              <Logo />
            </IconButton>
            <IconButton onClick={handleDrawerToggle}>
              <Close />
            </IconButton>
          </DrawerHeader>
          <Box sx={{ paddingX: open ? 3 : 1 }}>
            <DrawerContent openDrawer={true} />
          </Box>
        </Drawer>
      )}
    </>
  );
}
