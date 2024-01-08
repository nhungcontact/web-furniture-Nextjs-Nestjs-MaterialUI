import WarehouseReceiptHeader from "@/components/warehouse-receipts/WarehouseReceiptHeader";
import WarehouseReceiptTable from "@/components/warehouse-receipts/WarehouseReceiptTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function WarehouseReceiptPage() {
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
          <WarehouseReceiptHeader
            title="List Warehouse Receipt"
            button={true}
            nameButton="Create Warehouse Receipt"
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
            <WarehouseReceiptTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default WarehouseReceiptPage;
