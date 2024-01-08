"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Typography,
  Stack,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "@/config/theme";
const HeaderLayout = () => {
  const [state, setState] = React.useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };
  const list = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <List
          sx={{
            width: 250,
          }}
        >
          <ListItem>
            <Link
              href={"/login"}
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </ListItem>
          <ListItem>
            <Link
              href={"/signup"}
              style={{ textDecoration: "none" }}
            >
              Sign up
            </Link>
          </ListItem>
        </List>
      </Box>
    );
  };
  return (
    <>
      <Stack
        direction={{ xs: "row", sm: "row", md: "row" }}
        alignItems={{ xs: "center", sm: "center" }}
        justifyContent={{ xs: "space-around", sm: "space-between", md: "space-between" }}
        spacing={{ xs: "1", sm: "1", md: "12" }}
        sx={{
          position: "absolute",
          zIndex: "1",
          left: "0",
          top: "0",
          width: "100%",
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.down("md")]: {
              margin: "35px 0 0 0",
            },
            [theme.breakpoints.between("sm", "md")]: {
              margin: "35px 0 0 30px",
            },
            margin: "35px 0 0 48px",
          }}
        >
          <Link href={"/"}>
            <Image
              src={"/images/logo-fitivation.png"}
              alt={""}
              width={173}
              height={38}
            />
          </Link>
        </Box>

        <Box
          width={{ sx: "50px", sm: "50px", md: "200px" }}
          height={{ sx: "50px", sm: "50px" }}
          sx={{
            [theme.breakpoints.between("sm", "md")]: {
              position: "relative",
              top: "15px",
              left: "-70px",
            },
          }}
        >
          <Button
            onClick={toggleDrawer(true)}
            sx={{
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
              [theme.breakpoints.down("md")]: {
                position: "relative",
                top: "15px",
                left: "25px",
              },
              [theme.breakpoints.between("sm", "md")]: {
                position: "absolute",
                top: "0px",
                left: "30px",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "35px" }} />
          </Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {list()}
          </SwipeableDrawer>
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
              [theme.breakpoints.up("md")]: {
                height: "50px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                gap: "50px",
              },
            }}
          >
            <Link
              href={"/vi/login"}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                width={49}
                height={24}
                sx={{
                  cursor: "pointer",
                  color: "#FFFFFF",
                  transition: "all .35s",
                  ":hover": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              >
                Log in
              </Typography>
            </Link>

            <Link
              href={"/signup"}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="body2"
                width={60}
                height={24}
                sx={{
                  cursor: "pointer",
                  color: "#FFFFFF",
                  transition: "all .35s",
                  ":hover": {
                    color: "rgba(255, 255, 255, 0.6)",
                  },
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Box>
        </Box>
      </Stack>
    </>
  );
};
export default HeaderLayout;
