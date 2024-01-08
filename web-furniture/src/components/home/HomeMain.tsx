"use client";

import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
import { BannerHome } from "./BannerHome";
import BestSeller from "./BestSeller";
import { NewArrival } from "./NewArrival";
import { RoomCard } from "./RoomCard";
import { Sale } from "./Sale";
import { useTranslations } from "next-intl";

export default function HomeMain() {
  const t = useTranslations("MainPage");
  return (
    <>
      {/* <SnowfallEffect /> */}
      <BannerHome />
      <Container
        maxWidth={"lg"}
        sx={{ my: "50px" }}
      >
        {/* room */}
        <Box mb={6}>
          <RoomCard />
        </Box>
        {/* new */}
        <NewArrival />
        <Box
          position={"relative"}
          mb={6}
        >
          <Image
            src={"/images/sofa-home.png"}
            alt="sofa"
            width={1500}
            height={300}
            style={{
              width: "-webkit-fill-available",
              height: "-webkit-fill-available",
            }}
          />
          <Box
            position="absolute"
            bottom="80px"
            right="267px"
          >
            <Button variant="contained">{t("Show now")}</Button>
          </Box>
        </Box>
        {/* sale */}
        <Sale />
        <Box mb={6}>
          <Image
            src={"/images/chair-home-sale.png"}
            alt="sofa"
            width={1500}
            height={300}
            style={{
              width: "-webkit-fill-available",
              height: "-webkit-fill-available",
            }}
          />
        </Box>
        <BestSeller />
      </Container>
    </>
  );
}
