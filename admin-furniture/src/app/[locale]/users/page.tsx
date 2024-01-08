import UserHeader from "@/components/users/UserHeader";
import UserTable from "@/components/users/UserTable";
import { Container, Grid, Divider, Paper } from "@mui/material";

async function UserPage() {
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
          <UserHeader
            title="List User"
            button={true}
            nameButton="Create User"
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
            <UserTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserPage;
