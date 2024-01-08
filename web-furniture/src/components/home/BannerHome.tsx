import React from 'react'
import { Box, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper';
import BannerCard from '@/components/shared/BannerCard';
import BannerCardXS from '@/components/shared/BannerCardXS';

const banners = [
  {
    id:1,
    src:"/images/chair-banner.png",
    alt:"chair",
    title:"Greate for your home",
    description: "Interface creative design Everyone wants from fluent store",
    isButton: true,
    isBreadcrumbs: false
  },
  {
    id:2,
    src:"/images/chair-banner-1.png",
    alt:"chair",
    title:"Awesome product collecttion",
    description: "Interface creative design Everyone wants from fluent store",
    isButton: true,
    isBreadcrumbs: false
  },
]
export const BannerHome = () => {
  return (
    <Box>
      <Swiper 
          navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="mySwiper" 
        modules={[Navigation, Autoplay]}
      >
        {banners && banners.map((banner)=>(
          <SwiperSlide key={banner.id}>
            <Box display={{xs:"none", md:"block"}} bgcolor={"#F1F1F1"} >
              <BannerCard banner={banner} heightBanner={650}/>
            </Box>
            <Box display={{xs:"block", md:"none"}} bgcolor={"#F1F1F1"} >
              <BannerCardXS banner={banner} heightBanner={650} bottomImage={300} bottomTitle={60}/>
            </Box>
          </SwiperSlide>
        ))}
        
          <Box
            sx={{
              borderRadius: "50%",
              height: "33px",
              width: "33px",
              left:"50px",
              ":after": {
                color: `black`,
                fontSize: "15px",
                fontWeight: "900",
                border:"1px solid",
                borderRadius:"50%",
                padding:"12px 16px"
              },
            }}
            className="swiper-button-prev"
          ></Box>
          <Box
            sx={{
              borderRadius: "50%",
              height: "33px",
              width: "33px",
              right:"50px",
              ":after": {
                color: `black`,
                fontSize: "15px",
                fontWeight: "900",
                border:"1px solid",
                borderRadius:"50%",
                padding:"12px 16px"
              },
            }}
            className="swiper-button-next"
          ></Box>
      </Swiper>
    </Box>
  )
}
