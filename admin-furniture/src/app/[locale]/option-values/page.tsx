"use client";
import OptionValueHeader from "@/components/option-values/OptionValueHeader";
import OptionValueTable from "@/components/option-values/OptionValueTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

export type OptionPageProps = object;

function OptionPage({}: OptionPageProps) {
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
          <OptionValueHeader
            title="List Value"
            button={true}
            nameButton="Create Value"
          />
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Paper variant="outlined">
            <OptionValueTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OptionPage;
