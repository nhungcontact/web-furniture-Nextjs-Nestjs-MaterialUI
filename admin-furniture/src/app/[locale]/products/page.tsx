import ProductHeader from "@/components/products/ProductHeader";
import ProductTable from "@/components/products/ProductTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function ProductPage() {
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
          <ProductHeader
            title="List Product"
            button={true}
            nameButton="Create Product"
          />
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
            <ProductTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
