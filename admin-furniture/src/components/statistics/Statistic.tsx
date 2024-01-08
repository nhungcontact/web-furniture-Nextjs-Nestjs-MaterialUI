"use client";
import { Container, Grid } from "@mui/material";
// import ActivityTimeline from "./ActivityTimeline";
import ApexChartWrapper from "./ApexChartWrapper";
import Overview from "./Overview";
import StatisticsCard from "./StatisticsCard";
import Trophy from "./Trophy";

export default function Statistic() {
  return (
    <Container
      sx={{ py: 8 }}
      maxWidth="xl"
    >
      <ApexChartWrapper>
        <Grid
          container
          spacing={6}
          alignItems="end"
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <Trophy />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <StatisticsCard />
          </Grid>
          {/* <Grid
            item
            xs={12}
            md={6}
          >
            <ActivityTimeline />
          </Grid> */}
          <Grid
            item
            xs={12}
          >
            <Overview />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </Container>
  );
}
