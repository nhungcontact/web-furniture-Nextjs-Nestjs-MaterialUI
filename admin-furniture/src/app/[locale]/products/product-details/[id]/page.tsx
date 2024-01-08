"use client";

import ProductDetailHeader from "@/components/products/product-detail/view/ProductDetailHeader";
import ProductDetailTable from "@/components/products/product-detail/view/ProductDetailTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

export type ProductDetailPageProps = object;

function ProductDetailPage({}: ProductDetailPageProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{ my: 3 }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <ProductDetailHeader title="List Product Detail" />
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Paper
            variant="outlined"
            sx={{ borderRadius: 0, border: "none" }}
          >
            <ProductDetailTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
