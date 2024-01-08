"use client";
import { primary } from "@/config/theme";
import { Box, Container, Divider, Typography } from "@mui/material";
import Link from "next/link";
import FormSignIn from "./FormSignIn";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations("SignInUp");
  return (
    <>
      <Divider />
      <Container maxWidth="md">
        <Box
          textAlign={"end"}
          my={2}
          mx={4}
        >
          <Typography
            display={"inline-flex"}
            variant="body1"
          >
            {t("Do you have an account yet")}
          </Typography>
          <Link
            href={"/sign-up"}
            style={{ display: "inline-flex", color: `${primary[400]}` }}
          >
            <Typography>{t("Sign Up")}</Typography>
          </Link>
        </Box>
        <Box
          my={2}
          mx={18}
        >
          <Typography
            variant="h4"
            fontWeight={"bold"}
            mb={1}
          >
            {t("Welcome back")}
          </Typography>
          <Typography variant="body1">{t("Sign in to your Furnit account")}</Typography>
          <FormSignIn />
        </Box>
      </Container>
    </>
  );
}
