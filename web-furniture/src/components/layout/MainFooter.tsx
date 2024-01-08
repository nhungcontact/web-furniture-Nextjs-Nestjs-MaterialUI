"use client";
import { Container, Divider, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Container maxWidth="xl" component={"footer"} sx={{ pb: 4 }}>
      <Divider sx={{ my: 3 }} />
      <Typography textAlign={"center"} color={"textSecondary"}>
        FITIVATION
      </Typography>
      <Typography textAlign={"center"} color={"textSecondary"}>
        Powered by DRIMAES
      </Typography>
    </Container>
  );
}

export default MainFooter;
