import RoomFurnitureHeader from "@/components/room-furnitures/RoomFurnitureHeader";
import RoomFurnitureTable from "@/components/room-furnitures/RoomFurnitureTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function RoomFurniturePage() {
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
          <RoomFurnitureHeader
            title="List Room Furniture"
            button={true}
            nameButton="Create Room Furniture"
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
            <RoomFurnitureTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoomFurniturePage;
