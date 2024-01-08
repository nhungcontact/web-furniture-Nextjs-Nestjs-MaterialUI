import CustomLink from "@/components/shared/CustomLink";
import { useUserMenu } from "@/config/navigation";
import useCurrentUser from "@/hooks/shared/useCurrentUser";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

function CurrentUserView() {
  const userMenu = useUserMenu();
  const [userData, loading] = useCurrentUser();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!userData) return <></>;

  if (loading) return <CircularProgress size={24} />;

  return (
    <>
      <Button
        onClick={handleOpenUserMenu}
        sx={{ p: 0 }}
        color="inherit"
        endIcon={
          <Avatar>
            <Image
              src={userData.avatar}
              alt={userData.displayName}
              fill
              sizes="40px"
              unoptimized
            />
          </Avatar>
        }
      >
        <Box>
          <Typography
            variant="button"
            display={"block"}
            lineHeight={1.5}
            fontWeight={700}
            textAlign={"right"}
            textTransform={"none"}
          >
            {userData.displayName}
          </Typography>
          <Typography
            variant="caption"
            display={"block"}
            lineHeight={1}
            textAlign={"right"}
          >
            {userData.role}
          </Typography>
        </Box>
      </Button>

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {userMenu.map(({ label, path }) => (
          <MenuItem key={path}>
            <Typography
              component={CustomLink}
              href={path}
              textAlign="center"
            >
              {label}
            </Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </Menu>
    </>
  );
}

export default CurrentUserView;
