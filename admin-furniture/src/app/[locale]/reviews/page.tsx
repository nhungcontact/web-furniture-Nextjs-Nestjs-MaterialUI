import ReviewHeader from "@/components/reviews/ReviewHeader";
import ReviewTable from "@/components/reviews/ReviewTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function ReviewPage() {
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
          <ReviewHeader
            title="List Review"
            button={true}
            nameButton="CreateReview"
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
            <ReviewTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ReviewPage;
