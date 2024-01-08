import ProviderHeader from "@/components/providers/ProviderHeader";
import ProviderTable from "@/components/providers/ProviderTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function ProviderPage() {
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
          <ProviderHeader
            title="List Provider"
            button={true}
            nameButton="Create Provider"
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
            <ProviderTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProviderPage;
