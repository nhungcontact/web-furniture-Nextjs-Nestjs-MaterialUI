"use client";
import useUserInfor from "@/hooks/users/useUserInfor";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import ProductCard from "../shared/ProductCard";

export default function FavoriteList() {
  const { data, isLoading, error } = useUserInfor();

  return (
    <>
      {!!isLoading && !error && <LinearProgress />}
      <Container
        sx={{ py: 4 }}
        maxWidth="xl"
      >
        <Typography
          variant="h2"
          color="black"
          fontFamily={"serif"}
          fontWeight={"400"}
          textTransform={"capitalize"}
        >
          Favorites ({data?.products?.length ?? 0})
        </Typography>

        <Grid
          container
          spacing={4}
          marginTop={4}
          justifyContent="left"
        >
          {!!data &&
            !!data.products &&
            !!data.products.length &&
            data.products.map((item) => (
              <Grid
                key={item._id}
                item
                xs={4}
                md={3}
              >
                <ProductCard item={item} />
              </Grid>
            ))}
        </Grid>
        {!data?.products?.length && <Typography>No product</Typography>}
      </Container>
    </>
  );
}
