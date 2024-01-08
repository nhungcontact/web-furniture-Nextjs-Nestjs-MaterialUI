import ShippingHeader from "@/components/shippings/ShippingHeader";
import ShippingTable from "@/components/shippings/ShippingTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function ShippingPage() {
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
          <ShippingHeader
            title="List Shipping"
            button={true}
            nameButton="Create Shipping"
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
            <ShippingTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ShippingPage;
