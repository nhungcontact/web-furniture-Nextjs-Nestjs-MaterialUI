/* eslint-disable max-lines */
"use client";
import usePromotionList from "@/hooks/promotions/usePromotionList";
import { Box, Container, Grid, Typography } from "@mui/material";
import SnowfallEffect from "../shared/SnowfallEffect";
import { BannerSale } from "./BannerSale";
import CardPromotion from "./CardPromotion";
import SaleByCategory from "./SaleByCategory";
import useProductListSoldHighestByCat from "@/hooks/products/useProductListSoldHighestByCat";
import TitleSale from "./TitleSale";
import { useTranslations } from "next-intl";

export default function Sale() {
  const t = useTranslations("MainPage");
  const { data: promotions } = usePromotionList();
  const { data: list } = useProductListSoldHighestByCat();
  return (
    <>
      <SnowfallEffect />
      <Box
        pb={2}
        sx={{
          background: "#fff0ec",
          color: "black",
          height: "100%",
        }}
      >
        <BannerSale />
        <Container sx={{ mb: 10 }}>
          {!!promotions && !!promotions.items && !!promotions.items.length && (
            <>
              <TitleSale title={t("Festival saving await")} />
              <Grid
                container
                spacing={3}
                mb={12}
              >
                {promotions.items.map((item, i) => {
                  return (
                    new Date(item.dateExpire) >= new Date() &&
                    new Date(item.dateApply) < new Date() && (
                      <CardPromotion
                        key={i}
                        index={i}
                        item={item}
                      />
                    )
                  );
                })}
              </Grid>
            </>
          )}

          {!!list && !!list.length && (
            <>
              <TitleSale title={t("Top selling products")} />
              <SaleByCategory data={list} />
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
