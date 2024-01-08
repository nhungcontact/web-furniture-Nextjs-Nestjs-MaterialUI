import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductCardHover from "../shared/ProductCardHover";
import useProductList from "@/hooks/products/useProductList";
import { useTranslations } from "next-intl";

export const Sale = () => {
  const { data } = useProductList({ limit: 10000 });
  const t = useTranslations("MainPage");

  //   useEffect(() => {
  //     if (!!data && !!data.items && !!data.items.length) {
  //       const list = data.items.map((item) => item.productSkus);
  //     }
  //   }, []);
  return (
    <>
      <Box
        textAlign={"center"}
        marginBottom={4}
      >
        <Typography
          variant="body1"
          color={"black"}
          textTransform={"uppercase"}
        >
          {t("Our product")}
        </Typography>
        <Typography
          variant="h3"
          color={"black"}
          textTransform={"uppercase"}
        >
          {t("Sales")}
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
      >
        {!!data &&
          !!data.items &&
          !!data.items.length &&
          data.items.map((item) => {
            return (
              !!item.productSkus[0].percent && (
                <Grid
                  item
                  xs={6}
                  md={3}
                  key={item._id}
                >
                  <ProductCardHover item={item} />
                </Grid>
              )
            );
          })}
      </Grid>
    </>
  );
};
