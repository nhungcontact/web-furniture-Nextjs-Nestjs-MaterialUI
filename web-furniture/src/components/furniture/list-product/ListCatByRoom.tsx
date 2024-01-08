import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { primary } from "@/config/theme";
import useRoomFurnitureDetail from "@/hooks/room-furnitures/useRoomFurnitureDetail";
import { useSearchParams } from "next/dist/client/components/navigation";
import "swiper/css";
import "swiper/css/navigation";

export function ListCatByRoom() {
  const searchParams = useSearchParams();
  const room = searchParams.get("roomFurniture");
  const { data: dataRoom } = useRoomFurnitureDetail(room ? room : "");
  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {dataRoom?.categories &&
          dataRoom?.categories.length &&
          dataRoom?.categories.map((item) => (
            <SwiperSlide key={item._id}>
              <Box>
                <Image
                  src={item.photo.imageURL}
                  alt={item.photo.name}
                  width={240}
                  height={180}
                  unoptimized
                />
                <Link
                  href={`/furniture/product?roomFurniture=${room}&category=${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body2"
                    color="black"
                    fontWeight={"bold"}
                    textTransform={"capitalize"}
                    sx={{
                      textDecoration: "underline",
                      ":hover": { color: `${primary[400]}` },
                    }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </Box>
            </SwiperSlide>
          ))}
        <Box
          className="swiper-button-prev"
          sx={{
            color: `black`,
            padding: "0px 15px 0px 15px",
            bgcolor: "#F4F4F4",
            opacity: 0.8,
            "&:after": {
              color: `black`,
              fontSize: "20px",
              fontWeight: "400",
            },
          }}
        ></Box>
        <Box
          className="swiper-button-next"
          sx={{
            color: `black`,
            padding: "0px 15px 0px 15px",
            bgcolor: "#F4F4F4",
            opacity: 0.8,
            "&:after": {
              color: `black`,
              fontSize: "20px",
              fontWeight: "400",
            },
          }}
        ></Box>
      </Swiper>
    </>
  );
}
