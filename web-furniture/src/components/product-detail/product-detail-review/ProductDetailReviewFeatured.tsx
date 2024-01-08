import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Image from "next/image";
import { GetReview } from "@/types/review";

type Props = {
  reviewTop?: GetReview[];
};
const photos = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
  "https://swiperjs.com/demos/images/nature-5.jpg",
  "https://swiperjs.com/demos/images/nature-6.jpg",
  "https://swiperjs.com/demos/images/nature-7.jpg",
  "https://swiperjs.com/demos/images/nature-8.jpg",
  "https://swiperjs.com/demos/images/nature-9.jpg",
  "https://swiperjs.com/demos/images/nature-10.jpg",
];
export default function ProductDetailReviewFeatured({ reviewTop }: Props) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {!!reviewTop &&
          !!reviewTop.length &&
          reviewTop.map((item) => {
            return (
              !!item.photos &&
              !!item.photos.length &&
              item.photos.map((photo) => (
                <SwiperSlide key={photo._id}>
                  <Image
                    src={photo.imageURL ?? "/"}
                    alt={photo.name ?? "-"}
                    width={250}
                    height={180}
                    unoptimized
                    style={{ width: "-webkit-fill-available" }}
                  />
                </SwiperSlide>
              ))
            );
          })}
        {!reviewTop?.length &&
          photos.map((item) => (
            <SwiperSlide key={item}>
              <Image
                src={item}
                alt={"dsadasd"}
                width={250}
                height={180}
                unoptimized
                style={{ width: "-webkit-fill-available" }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
