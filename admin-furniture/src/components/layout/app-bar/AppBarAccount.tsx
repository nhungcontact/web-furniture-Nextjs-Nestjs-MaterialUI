/* eslint-disable max-lines */
// ** React Imports
import { Fragment, SyntheticEvent, useState } from "react";

// ** Next Import
import { useRouter } from "next/navigation";

// ** MUI Imports
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// ** Icons Imports
import useUserDetail from "@/hooks/users/useUserDetail";
import { UserType } from "@/types/user";
import getUser from "@/utils/getUser";
import { Logout } from "@mui/icons-material";
import { useSnackbar } from "notistack";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const AppBarAccount = () => {
  const { data: user } = useUserDetail(getUser() ? getUser()?._id : "");
  const { enqueueSnackbar } = useSnackbar();
  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks
  const router = useRouter();

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    enqueueSnackbar("Logout successfully", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    router.push("login");
  };

  //   console.log("li", isValidRole({ permissionList, role: "ViewProduct" }));
  return (
    <Fragment>
      {!!user && user.userType === UserType.Personnel && (
        <Box>
          <Badge
            overlap="circular"
            onClick={handleDropdownOpen}
            sx={{ ml: 2, cursor: "pointer" }}
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Avatar
              alt={user.avatar?.name ?? user.firstName + " " + user.lastName}
              src={user.avatar?.imageURL ?? "/images/avatars/1.png"}
              onClick={handleDropdownOpen}
              sx={{ width: 40, height: 40 }}
            />
          </Badge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleDropdownClose()}
            sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ pt: 2, pb: 3, px: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Badge
                  overlap="circular"
                  badgeContent={<BadgeContentSpan />}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    alt={user.avatar?.name ?? user.firstName + " " + user.lastName}
                    src={user.avatar?.imageURL ?? "/images/avatars/1.png"}
                    sx={{ width: "2.5rem", height: "2.5rem" }}
                  />
                </Badge>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: 3,
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: 600 }}>{user.username}</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: "0.8rem", color: "text.disabled" }}
                  >
                    {user.firstName + " " + " " + user.lastName}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
            <MenuItem
              sx={{ py: 2 }}
              onClick={handleLogout}
            >
              <Logout
                sx={{ marginRight: 2, fontSize: "1.375rem", color: "text.secondary" }}
              />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Fragment>
  );
};

export default AppBarAccount;
