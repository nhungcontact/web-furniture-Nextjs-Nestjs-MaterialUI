"use client";

import { useMainMenu } from "@/config/navigation";
import AdbIcon from "@mui/icons-material/AdbOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signIn, useSession } from "next-auth/react";
import * as React from "react";
import CustomLink from "../shared/CustomLink";
import CurrentUserView from "./views/CurrentUserView";

MainAppBar.maxHeight = 70;

function MainAppBar() {
  const mainMenu = useMainMenu();

  const { status } = useSession();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const appLogo = (
    <>
      <AdbIcon sx={{ mr: 1 }} />
      <Typography variant="h5">LOGO</Typography>
    </>
  );

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* ========== Desktop Appbar ========== */}
            <CustomLink
              href="/"
              color={"inherit"}
              sx={{ display: { xs: "none", md: "flex" }, mr: 2, alignItems: "center" }}
            >
              {appLogo}
            </CustomLink>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {mainMenu.map(({ label, path }) => (
                <Button
                  key={path}
                  href={path}
                  LinkComponent={CustomLink}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* ========== Mobile Appbar ========== */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {mainMenu.map(({ label, path }) => (
                  <MenuItem key={path}>
                    <CustomLink href={path}>
                      <Typography
                        component={"span"}
                        textAlign="center"
                      >
                        {label}
                      </Typography>
                    </CustomLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <CustomLink
              href="/"
              color={"inherit"}
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
              }}
            >
              {appLogo}
            </CustomLink>

            {/* ========== Right Side ========== */}
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
              {status == "authenticated" && <CurrentUserView />}

              {status == "loading" && (
                <CircularProgress
                  color="inherit"
                  size={24}
                />
              )}

              {status == "unauthenticated" && (
                <Button
                  color="inherit"
                  onClick={() => signIn()}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
export default MainAppBar;
