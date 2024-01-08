import PromotionHeader from "@/components/promotions/PromotionHeader";
import PromotionTable from "@/components/promotions/PromotionTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function PromotionPage() {
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
          <PromotionHeader
            title="List Promotion"
            button={true}
            nameButton="Create Promotion"
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
            <PromotionTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PromotionPage;
