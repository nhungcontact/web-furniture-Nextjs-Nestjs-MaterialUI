"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Alert, Button, Container, Typography } from "@mui/material";

export type ErrorContentProps = {
  error: Error & { digest?: string };
  title?: string;
  severity?: "error" | "warning";
  onTryAgain?: () => void;
};

function ErrorContent({
  error,
  title,
  severity = "error",
  onTryAgain,
}: ErrorContentProps) {
  const t = useTranslations("ErrorContent");

  return (
    <Container maxWidth="xl">
      <Typography
        variant="h4"
        lineHeight={2}
        color={severity}
        sx={{
          my: 2,
          fontWeight: 700,
        }}
      >
        {title || error.name}
      </Typography>
      <Alert
        variant="standard"
        severity={severity}
        sx={{
          mb: 5,
        }}
      >
        {error.message} ({error.digest})
      </Alert>
      {!!onTryAgain && (
        <Button
          variant="outlined"
          onClick={onTryAgain}
        >
          {t("tryAgain")}
        </Button>
      )}
    </Container>
  );
}

export default ErrorContent;
