"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const HeadingLayout = () => {
  return (
    <>
      <Image
        src={"/images/logo.png"}
        alt={""}
        width={173}
        height={38}
        style={{ position: "absolute", left: "48px", top: "32px" }}
      />

      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        padding={0}
        gap={4}
        position={"absolute"}
        width={149}
        height={24}
        left={"calc(92% - 149px/2 - 8px)"}
        top={40}
        zIndex={"-1"}
      >
        <Typography
          variant="body2"
          width={49}
          height={24}
          flex={"none"}
          order={0}
          flexGrow={0}
          sx={{
            ":hover": {
              color: "white",
              opacity: 0.6,
            },
          }}
          color={"#FFFFFF"}
        >
          Log in
        </Typography>
        <Typography
          variant="body2"
          width={60}
          height={24}
          flex={"none"}
          order={1}
          flexGrow={0}
          sx={{
            ":hover": {
              color: "white",
              opacity: 0.6,
            },
          }}
          color={"#FFFFFF"}
        >
          Sign up
        </Typography>
      </Box>
    </>
  );
};

export default HeadingLayout;
