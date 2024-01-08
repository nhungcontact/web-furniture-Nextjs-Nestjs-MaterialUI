"use client";

import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
import { Divider } from "@mui/material";
import React from "react";
import FooterLayout from "./footer-main/FooterLayout";
import HeaderLayout from "./header-main/HeaderLayout";
import { SnackbarProvider } from "notistack";

Kommunicate.init("63e1b7594744b84cab112973980702ba", {
  automaticChatOpenOnNavigation: true,
  popupWidget: true,
  //   voiceName: [
  //     "Victoria",
  //     "Google US English",
  //     "Microsoft Aria Online (Natural) - English (United States)",
  //     "Samantha",
  //   ],
  //   voiceOutput: true,
  //   voiceInput: true,
  emojilibrary: true,
  //   quickReplies: ["Speak with an Agent", "Book a Demo", "Sample Bots"],
});

type MainLayoutProps = {
  children: React.ReactNode;
  locale: string;
};

function MainLayout({ children, locale }: MainLayoutProps) {
  return (
    <>
      <SnackbarProvider>
        <HeaderLayout locale={locale} />
        <main
          style={{
            minHeight: "100vh",
            top: 0,
            left: 0,
          }}
        >
          {children}
        </main>

        <Divider />
        <FooterLayout />
      </SnackbarProvider>
    </>
  );
}

export default MainLayout;
