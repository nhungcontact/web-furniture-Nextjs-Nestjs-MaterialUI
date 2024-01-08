import RatingReview from "@/components/shared/RatingReview";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import ProductDetailReviewImage from "./ProductDetailReviewImage";
import { GetReview } from "@/types/review";
import Image from "next/image";
import { useState } from "react";
type Props = {
  item: GetReview;
};

export default function ProductDetailReviewsItem({ item }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box marginTop={4}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          columnGap={1}
          marginBottom={1}
        >
          <Avatar
            alt={item.user.username}
            src={item.user.avatar?.imageURL ?? "/"}
          />
          <Typography
            variant="body1"
            fontWeight={"bold"}
          >
            {item.user.firstName + " " + item.user.lastName}
          </Typography>
        </Box>
        <Typography variant="body1">
          {new Date(item.createdAt).toLocaleString()}
        </Typography>
      </Box>
      <RatingReview defaultValue={item.rating ?? 5} />
      {!!item.productSku.optionValues &&
        !!item.productSku.optionValues.length &&
        item.productSku.optionValues.map((value) => (
          <Box key={value._id}>
            <Typography
              variant="body2"
              fontWeight={600}
              display={"inline"}
              mr={1}
            >
              {value.optionSku.name}:
            </Typography>
            <Typography
              variant="body2"
              display={"inline"}
            >
              {value.name}
            </Typography>
          </Box>
        ))}
      {/* <Box>
        <Typography
          variant="body1"
          fontWeight={600}
          display={"inline"}
        >
          Material:{" "}
        </Typography>
        <Typography
          variant="body1"
          display={"inline"}
        >
          Brass
        </Typography>
      </Box> */}
      <Typography
        variant="body2"
        marginTop={1}
      >
        {item.content ??
          "The Natural does not match the picture at ALL. It is way darker and warmer than...."}
      </Typography>
      <Grid
        container
        marginTop={2}
        columnSpacing={2}
      >
        {!!item &&
          !!item.photos &&
          !!item.photos.length &&
          item.photos.map((photo) => (
            <Grid
              item
              key={photo._id}
            >
              <Image
                onClick={handleClickOpen}
                src={photo.imageURL ?? "/"}
                alt={photo.name ?? "-"}
                width={120}
                height={100}
                unoptimized
              />
            </Grid>
          ))}
      </Grid>
      {!!item && !!item.photos && !!item.photos.length && (
        <ProductDetailReviewImage
          open={open}
          handleClose={handleClose}
          src={item.photos}
          data={item}
        />
      )}
    </Box>
  );
}
