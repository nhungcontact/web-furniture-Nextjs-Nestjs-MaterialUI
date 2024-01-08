import RoleHeader from "@/components/roles/RoleHeader";
import RoleTable from "@/components/roles/RoleTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function RolePage() {
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
          <RoleHeader
            title="List Role"
            button={true}
            nameButton="Create Role"
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
            <RoleTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RolePage;
