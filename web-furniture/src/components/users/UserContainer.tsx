"use client";

import { Container, Divider, Grid, Paper } from "@mui/material";
import React from "react";

type UserContainerProps = {
  header: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
};

function UserContainer({ header, left, right }: UserContainerProps) {
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
          {header}
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Paper variant="outlined">{left}</Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
        >
          <Paper variant="outlined">{right}</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserContainer;
