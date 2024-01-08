import BillItemHeader from "@/components/bills/bill-items/BillItemHeader";
import BillItemTable from "@/components/bills/bill-items/BillItemTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function BillItemPage() {
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
          <BillItemHeader
            title="List Detail Order"
            button={false}
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
            <BillItemTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BillItemPage;
