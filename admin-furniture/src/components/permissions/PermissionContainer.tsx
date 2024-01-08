"use client";

import { Container, Divider, Grid, Paper } from "@mui/material";
import React from "react";

type PermissionContainerProps = {
  header: React.ReactNode;
  body: React.ReactNode;
};

function PermissionContainer({ header, body }: PermissionContainerProps) {
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
        >
          <Paper sx={{ boxShadow: "0px 2px 10px 0px rgba(58, 53, 65, 0.1)" }}>
            {body}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PermissionContainer;
