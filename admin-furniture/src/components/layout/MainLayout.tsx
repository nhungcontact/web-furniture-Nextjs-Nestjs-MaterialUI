"use client";

import useUserDetail from "@/hooks/users/useUserDetail";
import { UserType } from "@/types/user";
import getUser from "@/utils/getUser";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import Login from "../login/Login";
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import MainAppBar from "./MainAppBar";
import MainDrawer from "./MainDrawer";
import MainFooter from "./MainFooter";

type MainLayoutProps = {
  children: React.ReactNode;
};

MainLayout.innerPadding = MainAppBar.maxHeight + MainFooter.maxHeight;
const drawerWidth = 320;

function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const { data: user } = useUserDetail(getUser() ? getUser()?._id : "");

  return (
    <SnackbarProvider>
      {/* <ComponentLoading open={isLoading} /> */}
      {!!user && user.userType === UserType.Personnel && (
        <Box sx={{ display: "flex", bgcolor: "background.default" }}>
          <MainAppBar
            open={open}
            handleDrawerToggle={handleDrawerToggle}
          />
          <MainDrawer
            open={open}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
          />
          <Box sx={{ flexGrow: 1 }}>
            <DrawerHeaderStyled />
            <main style={{ minHeight: `calc(100vh - ${MainLayout.innerPadding}px)` }}>
              {children}
            </main>
            <MainFooter />
          </Box>
        </Box>
      )}
      {user && user.userType === UserType.Customer && <Login />}
      {!user && <Login />}
    </SnackbarProvider>
  );
}

export default MainLayout;
