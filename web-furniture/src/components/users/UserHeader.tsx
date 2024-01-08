"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomLink from "../shared/CustomLink";
import { useSearchParams } from "next/navigation";

export type UserHeaderProps = object;

function UserHeader({}: UserHeaderProps) {
  const t = useTranslations("UserHeader");
  const searchParams = useSearchParams();

  return (
    <Box sx={{ px: 2, py: 1, display: "flex" }}>
      <Typography
        variant="h5"
        flexGrow={1}
      >
        {t("title")}
      </Typography>
      <Button
        startIcon={<AddIcon />}
        href={`/users/create?${searchParams}`}
        LinkComponent={CustomLink}
      >
        {t("create")}
      </Button>
    </Box>
  );
}

export default UserHeader;
