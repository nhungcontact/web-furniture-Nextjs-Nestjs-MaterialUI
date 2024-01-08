"use client";
import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import { useFooterMenu } from "@/config/navigation";
import CustomLink from "../shared/CustomLink";

MainFooter.maxHeight = 130;

function MainFooter() {
  const t = useTranslations("MainFooter");
  const footerMenu = useFooterMenu();

  return (
    <Container
      maxWidth="xl"
      component={"footer"}
      sx={{
        pb: 4,
        maxHeight: {
          xs: MainFooter.maxHeight * 2,
          md: MainFooter.maxHeight,
        },
      }}
    >
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box mt={2}>
          <Typography
            color={"textSecondary"}
            fontWeight={"700"}
          >
            {t("title")}
          </Typography>
          <Typography color={"textSecondary"}>{t("subtitle")}</Typography>
        </Box>
        <Box mt={2}>
          {footerMenu.map(({ label, path }) => (
            <CustomLink
              key={path}
              href={path}
              sx={{
                mr: 2,
              }}
            >
              {label}
            </CustomLink>
          ))}
          <LocaleSwitcher />
        </Box>
      </Box>
    </Container>
  );
}

export default MainFooter;
