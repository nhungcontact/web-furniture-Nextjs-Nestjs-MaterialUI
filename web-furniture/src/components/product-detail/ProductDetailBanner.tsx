import { Box } from '@mui/material'
import React from 'react'
import BannerCard from '../shared/BannerCard'
import BannerCardXS from '../shared/BannerCardXS'
const banner = {
    id:1,
    src:"/images/banner-product-detail.png",
    alt:"chair",
    title:"Product detail",
    isButton: false,
    isBreadcrumbs: true
  }
export const ProductDetailBanner = () => {
  return (
    <>
    <Box display={{xs:"none", md:"block"}} bgcolor={"#F1F1F1"} >
      <BannerCard banner={banner} heightBanner={500}/>
    </Box>
    <Box display={{xs:"block", md:"none"}} bgcolor={"#F1F1F1"} >
      <BannerCardXS banner={banner} heightBanner={500} bottomImage={200} bottomTitle={90}/>
    </Box>
    </>
  )
}
