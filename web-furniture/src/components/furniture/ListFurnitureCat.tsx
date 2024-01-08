// import { Category } from '@/types/category'
import { Category } from "@/types/category";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  item: Category[];
};
export function ListFurnitureCat({ item }: Props) {
  console.log("cat", item);
  const router = useRouter();
  return (
    <>
      <Grid
        container
        justifyContent={"start"}
        columnSpacing={2}
        rowSpacing={1}
      >
        {item &&
          item.length &&
          item.map((val) => (
            <Grid
              item
              md={4}
              key={val._id}
              onClick={() => router.push(`furniture/product/?category=${val._id}`)}
              sx={{ cursor: "pointer" }}
            >
              <Box
                display={"flex"}
                my={2}
                alignItems={"center"}
                border={"1px solid #d9d9d9"}
                p={1}
              >
                {val.photo && (
                  <Image
                    src={val.photo.imageURL}
                    alt={val.photo.name}
                    width={90}
                    height={70}
                    unoptimized
                  />
                )}
                <Box ml={2}>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                  >
                    {val.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
