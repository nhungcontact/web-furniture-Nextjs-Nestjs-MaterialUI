import CommentHeader from "@/components/comments/CommentHeader";
import CommentTable from "@/components/comments/CommentTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function CommentPage() {
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
          <CommentHeader
            title="List Comment"
            button={true}
            nameButton="CreateComment"
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
            <CommentTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CommentPage;
