import { Box, IconButton, useTheme } from "@mui/material";
// import AppBarSearch from "./AppBarSearch";
import AppBarNotification from "./AppBarNotification";
import AppBarAccount from "./AppBarAccount";
import React from "react";
import { ColorModeContext } from "@/context/ColorModeContext";
import { NightsStay, WbSunny } from "@mui/icons-material";

function AppBarContent() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      {/* <AppBarSearch /> */}
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: "flex" }}>
        <AppBarNotification />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.primary',
            borderRadius: 1,
          }}
        >
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? (
              <WbSunny />
            ) : (
              <NightsStay />
            )}
          </IconButton>
        </Box>
        <AppBarAccount />
      </Box>
    </>
  );
}
export default AppBarContent;
