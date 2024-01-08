"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
function HeroBanner() {
  return (
    <>
      <Box>
        <Image
          src={"/images/Vector-8.png"}
          alt={""}
          width={680}
          height={837}
          style={{
            position: "absolute",
            left: "870px",
            // top: '-21px',
            opacity: 0.8,
          }}
        />
        <Image
          src={"/images/Vector-9.png"}
          alt={""}
          width={674}
          height={837}
          style={{
            position: "absolute",
            left: "695px",
            top: "73px",
            opacity: 0.8,
            transform: "rotate(5deg)",
          }}
        />
      </Box>
      <Image
        src={"/images/Hero-banner.png"}
        alt={""}
        width={637}
        height={490}
        style={{
          position: "absolute",
          left: "860px",
          top: "235px",
        }}
      />
    </>
  );
}

export default HeroBanner;
