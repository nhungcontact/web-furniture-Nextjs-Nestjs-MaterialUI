"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { EmotionCacheProvider } from "./EmotionCacheProvider";
import { theme } from "@/config/theme";
import SWRProvider from "./SWRProvider";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

function AppProviders({ children }: Props) {
  return (
    <>
      <CssBaseline />
      <EmotionCacheProvider options={{ key: "mui-css" }}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <SWRProvider>{children}</SWRProvider>
          </ThemeProvider>
        </SessionProvider>
      </EmotionCacheProvider>
    </>
  );
}

export default AppProviders;
