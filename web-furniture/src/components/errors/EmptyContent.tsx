"use client";

import { Container, Typography } from "@mui/material";
import EmptyIcon from "@mui/icons-material/NewReleasesOutlined";

export type EmptyContentProps = {
  caption: string;
};

function EmptyContent({ caption }: EmptyContentProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <EmptyIcon sx={{ fontSize: 50, mb: 2, color: "text.secondary" }} />
      <Typography variant="body1">{caption}</Typography>
    </Container>
  );
}

export default EmptyContent;
