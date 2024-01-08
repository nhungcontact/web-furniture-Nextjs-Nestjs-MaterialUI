import BlogHeader from "@/components/blogs/BlogHeader";
import BlogTable from "@/components/blogs/BlogTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function BlogPage() {
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
          <BlogHeader
            title="List Blog"
            button={true}
            nameButton="Create Blog"
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
            <BlogTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogPage;
