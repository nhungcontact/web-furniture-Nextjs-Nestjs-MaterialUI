import OptionHeader from "@/components/options/OptionHeader";
import OptionTable from "@/components/options/OptionTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function OptionPage() {
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
          <OptionHeader
            title="List Option"
            button={true}
            nameButton="Create Option"
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
            <OptionTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OptionPage;
