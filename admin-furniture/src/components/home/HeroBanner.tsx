"use client";

import { Box, Container, Slide, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

function HeroBanner() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("HeroBanner");

  useEffect(() => setMounted(true), []);

  return (
    <Container
      maxWidth={false}
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Image
        src={"/images/home-banner.jpg"}
        alt={""}
        fill
        style={{ objectFit: "cover", zIndex: -1 }}
      />
      <Box sx={{ position: "absolute", top: "25%", right: "5%", left: "5%" }}>
        <Slide
          direction="right"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Typography
            variant="h1"
            sx={{
              color: "secondary.contrastText",
              textAlign: "center",
              mb: 2,
            }}
          >
            {t("title")}
          </Typography>
        </Slide>
        <Slide
          direction="left"
          in={mounted}
          mountOnEnter
          timeout={800}
        >
          <Typography
            variant="overline"
            sx={{
              color: "secondary.contrastText",
              textAlign: "center",
              fontSize: "h5.fontSize",
              display: "block",
            }}
          >
            {t("description")}
          </Typography>
        </Slide>
      </Box>
    </Container>
  );
}

export default HeroBanner;
