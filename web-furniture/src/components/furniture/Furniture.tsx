"use client";
import { Box, Container, Typography } from "@mui/material";
import { BannerFurniture } from "./BannerFurniture";
import { FeatureCat } from "./FeatureCat";
import { ListFurniture } from "./ListFurniture";

export const Furniture = () => {
  return (
    <>
      <BannerFurniture />
      <Container
        maxWidth={"xl"}
        sx={{ paddingY: 2 }}
      >
        <Box
          my={1}
          textAlign={"center"}
        >
          <Typography
            variant="h2"
            textTransform={"uppercase"}
          >
            Furniture
          </Typography>
        </Box>
        <ListFurniture />
        {/* <Grid container columnSpacing={8}>
          <Grid item xs={3}>
            <ListFilter />
          </Grid>
          <Grid item xs={8}>
              <ListProduct />
          </Grid>
        </Grid> */}

        <FeatureCat />
      </Container>
    </>
  );
};
