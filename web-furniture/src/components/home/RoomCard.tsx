import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { useRouter } from "next-intl/client";
import Image from "next/image";

export const RoomCard = () => {
  const { data: rooms } = useRoomFurnitureList({ limit: 4 });
  const router = useRouter();
  return (
    <>
      {!!rooms && !!rooms.items && (
        <ImageList
          sx={{ overflow: "none" }}
          cols={rooms.items.length}
          gap={40}
        >
          {!!rooms.items.length &&
            rooms.items.map((item) => (
              <ImageListItem
                key={item._id}
                sx={{ ":hover": { cursor: "pointer" } }}
                onClick={() =>
                  router.push(`/furniture/product?roomFurniture=${item._id}`)
                }
              >
                <Image
                  // srcSet={`${item.photo.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.photo.imageURL}?w=248&fit=crop&auto=format`}
                  alt={item.photo.name}
                  loading="lazy"
                  unoptimized
                  width={250}
                  height={200}
                  style={{
                    width: "-webkit-fill-available",
                    height: "300px",
                  }}
                />
                <ImageListItemBar
                  sx={{
                    p: 2,
                  }}
                  title={<Typography variant="h4">{item.name}</Typography>}
                  subtitle={<Typography variant="body2">{item.description}</Typography>}
                />
              </ImageListItem>
            ))}
        </ImageList>
      )}
    </>
  );
};
