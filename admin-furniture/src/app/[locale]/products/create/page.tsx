"use client";
import ProductHeader from "@/components/products/ProductHeader";
import ProductCreate from "@/components/products/create/ProductCreate";
import { Container, Divider, Grid } from "@mui/material";

export type ProductCreatePageProps = object;

function ProductCreatePage({}: ProductCreatePageProps) {
  return (
    <Container sx={{ my: 3 }}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <ProductHeader
            title="Create Product"
            button={false}
          />
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <ProductCreate />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCreatePage;
