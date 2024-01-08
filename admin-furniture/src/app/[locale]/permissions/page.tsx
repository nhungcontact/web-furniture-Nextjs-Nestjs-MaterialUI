import PermissionHeader from "@/components/permissions/PermissionHeader";
import PermissionTable from "@/components/permissions/PermissionTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function PermissionPage() {
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
          <PermissionHeader
            title="List Permission"
            button={true}
            nameButton="Create Permission"
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
            <PermissionTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PermissionPage;
