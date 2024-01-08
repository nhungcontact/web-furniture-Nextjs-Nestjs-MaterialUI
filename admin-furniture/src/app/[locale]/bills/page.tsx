import BillHeader from "@/components/bills/BillHeader";
import BillTable from "@/components/bills/BillTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function BillPage() {
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
          <BillHeader
            title="List Order"
            button={false}
            // nameButton="Order Detail"
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
            <BillTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BillPage;
