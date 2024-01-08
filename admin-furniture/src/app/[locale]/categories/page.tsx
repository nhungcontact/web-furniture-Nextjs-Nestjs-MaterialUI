import CategoryHeader from "@/components/categories/CategoryHeader";
import CategoryTable from "@/components/categories/CategoryTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function CategoryPage() {
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
          <CategoryHeader
            title="List Category"
            button={true}
            nameButton="Create Category"
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
            <CategoryTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryPage;
