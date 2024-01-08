import { Box, Typography } from "@mui/material";
import { Navigation } from "swiper";
import { Swiper } from "swiper/react";

export function FeatureCat() {
  //   const
  return (
    <>
      <Box py={3}>
        <Typography
          variant="h3"
          fontFamily={"serif"}
          textTransform={"capitalize"}
        >
          Feature Category
        </Typography>
        <Box>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            // navigation={{
            //   prevEl: ".swiper-button-prev",
            //   nextEl: ".swiper-button-next",
            // }}
            // pagination={{
            //   clickable: true,
            // }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          ></Swiper>
        </Box>
      </Box>
    </>
  );
}
