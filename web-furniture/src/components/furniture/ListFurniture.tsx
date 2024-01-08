import { primary } from "@/config/theme";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { Alert, Grid, LinearProgress, Typography } from "@mui/material";
import Link from "next/link";
import { ListFurnitureCat } from "./ListFurnitureCat";
import { RoomFurnitureStatus } from "@/types/room-furniture";

export function ListFurniture() {
  const { data, error, isLoading, isValidating } = useRoomFurnitureList({
    status: RoomFurnitureStatus.Active,
  });
  return (
    <>
      <Grid
        container
        rowSpacing={4}
      >
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}

        {!!data?.items &&
          !!data?.items?.length &&
          data?.items?.map((item) => (
            <Grid
              item
              xs={12}
              key={item._id}
            >
              <Link
                href={`furniture/product/?roomFurniture=${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h3"
                  color="black"
                  fontFamily={"serif"}
                  fontWeight={"400"}
                  textTransform={"capitalize"}
                  sx={{
                    textDecoration: "underline",
                    ":hover": { color: `${primary[400]}` },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
              {item && item.categories && item.categories.length ? (
                <ListFurnitureCat item={item.categories} />
              ) : (
                <Alert severity="info">No data</Alert>
              )}
            </Grid>
          ))}
        {!isLoading && error && <Alert severity="error">Error {error?.message}</Alert>}
        {!isLoading && !data && <Alert severity="info">No data</Alert>}
      </Grid>
    </>
  );
}
