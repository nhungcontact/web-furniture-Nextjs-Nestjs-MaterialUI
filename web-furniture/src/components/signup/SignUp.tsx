"use client";
import { Box, Container, Divider, Typography } from "@mui/material";
import FormSignUp from "./FormSignUp";
import { useTranslations } from "next-intl";

export default function SignUp() {
  const t = useTranslations("SignInUp");
  return (
    <>
      <Divider />
      <Container maxWidth="md">
        {/* <Grid
        container
        justifyContent={"space-between"}
      >
        <Grid
          item
          md={5}
          display={{ xs: "none", md: "block" }}
        >
          <Image
            src="/images/bed-room.jpg"
            alt="poster"
            width={560}
            height={560}
            style={{ height: "-webkit-fill-available", width: "-webkit-fill-available" }}
            priority
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
        > */}
        <Box
          my={6}
          mx={18}
        >
          <Typography
            variant="h4"
            fontWeight={"bold"}
            mb={1}
          >
            {t("Welcome")}
            <br />
            {t("First things first")}
            {/* Sign Up */}
          </Typography>
          <Typography variant="body2">
            {t("Create a profile to personalize how you will appear to collaboraors")}
          </Typography>
          <FormSignUp />
        </Box>
        {/* </Grid>
      </Grid> */}
      </Container>
    </>
  );
}
