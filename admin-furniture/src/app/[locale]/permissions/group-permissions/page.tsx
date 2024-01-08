"use client";
import GroupPermissionHeader from "@/components/permissions/group-permissions/GroupPermissionHeader";
import GroupPermissionTable from "@/components/permissions/group-permissions/GroupPermissionTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

export type GroupPermissionCreatePageProps = object;

function GroupPermissionCreatePage({}: GroupPermissionCreatePageProps) {
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
          <GroupPermissionHeader
            title="List Group Permission"
            button={true}
            nameButton="CreateGroup"
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
            <GroupPermissionTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GroupPermissionCreatePage;
