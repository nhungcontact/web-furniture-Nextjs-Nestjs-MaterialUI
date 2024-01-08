import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../shared/ProductCard";
import useProductList from "@/hooks/products/useProductList";

export const NewArrival = () => {
  const { data } = useProductList({
    isArrival: true,
    limit: 8,
  });
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
          Our product
        </Typography>
        <Typography
          variant="h3"
          color={"black"}
          textTransform={"uppercase"}
        >
          New Arrivals
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
      >
        {!!data &&
          !!data.items &&
          !!data.items.length &&
          data.items.map((item) => (
            <Grid
              item
              xs={6}
              md={3}
              key={item._id}
            >
              <ProductCard item={item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
