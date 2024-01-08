/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CssBaseline, PaletteMode, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import React from "react";
import { EmotionCacheProvider } from "./EmotionCacheProvider";
import SWRProvider from "./SWRProvider";
import { SessionProvider } from "next-auth/react";
import { ColorModeContext } from "@/context/ColorModeContext";
import { getDesignTokens } from "@/config/theme";
import Typography from "@/config/typography";
// import overrides from "@/config/overrides";

type Props = {
  children: React.ReactNode;
};

function AppProviders({ children }: Props) {
   const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = createTheme(theme, {
    // components: { ...overrides(theme) },
    typography: { ...Typography(theme) }
  })
  theme = responsiveFontSizes(theme);
  return (
    <>
      <EmotionCacheProvider options={{ key: "mui-css" }}>
        <SessionProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SWRProvider>{children}</SWRProvider>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </SessionProvider>
      </EmotionCacheProvider>
    </>
  );
}

export default AppProviders;
