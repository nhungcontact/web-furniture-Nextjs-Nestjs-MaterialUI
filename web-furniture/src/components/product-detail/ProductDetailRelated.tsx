// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
// import ProductCardHover from '../shared/ProductCardHover';
import { secondary } from "@/config/theme";
import useProductList from "@/hooks/products/useProductList";
import { GetProduct } from "@/types/product";
import { Box } from "@mui/material";
import ProductCardHover from "../shared/ProductCardHover";
type Props = {
  item: GetProduct;
};
export default function ProductDetailRelated({ item }: Props) {
  const { data: product } = useProductList({
    category: item.category._id,
  });
  return (
    <Box position={"relative"}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
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
      >
        {!!product &&
          !!product.items &&
          !!product.items.length &&
          product.items.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCardHover item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Box
        className="swiper-button-prev"
        sx={{
          position: "absolute",
          left: { xs: "70%", sm: "70%", md: "90%", lg: "90%" },
          top: "-10%",
          color: `${secondary[400]}`,
          padding: "0px 15px 0px 15px",
          border: "1px solid",
          "&:after": {
            color: `${secondary[400]}`,
            fontSize: "18px",
            fontWeight: "400",
          },
        }}
      ></Box>
      <Box
        className="swiper-button-next"
        sx={{
          position: "absolute",
          right: "1%",
          top: "-10%",
          color: `${secondary[400]}`,
          padding: "0px 15px 0px 15px",
          border: "1px solid",
          "&:after": {
            color: `${secondary[400]}`,
            fontSize: "16px",
            fontWeight: "400",
          },
        }}
      ></Box>
    </Box>
  );
}
