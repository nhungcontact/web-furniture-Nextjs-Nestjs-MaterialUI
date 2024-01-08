"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container, Typography } from "@mui/material";
import CustomButton from "../shared/CustomButton";
import { useRouter } from "next-intl/client";

function NotFound() {
  const t = useTranslations("NotFound");
  const router = useRouter();

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h3"
        lineHeight={2}
      >
        {t("title")}
      </Typography>
      <Typography mb={4}>{t("description")}</Typography>
      <CustomButton
        variant="outlined"
        onClick={() => router.back()}
      >
        {t("buttonText")}
      </CustomButton>
    </Container>
  );
}

export default NotFound;
