import { Box } from "@mui/material";
import Image from "next/image";

const banner = {
  id: 1,
  src: "/images/banner-sale.png",
  alt: "chair",
  title: "Modern Furniture",
  isButton: false,
  isBreadcrumbs: true,
};
export const BannerSale = () => {
  return (
    <Box sx={{ position: "relative", textAlign: "center", mb: 10 }}>
      <Image
        src={banner.src}
        alt={banner.alt}
        width={1800}
        height={700}
        style={{
          width: "-webkit-fill-available",
          height: "-webkit-fill-available",
        }}
      />
      {/* <Box
        display={{ xs: "none", md: "block" }}
        bgcolor={"#F1F1F1"}
      >
        <BannerCard
          banner={banner}
          heightBanner={500}
        />
      </Box> */}
      {/* <Box
        display={{ xs: "block", md: "none" }}
        bgcolor={"#F1F1F1"}
      >
        <BannerCardXS
          banner={banner}
          heightBanner={500}
          bottomImage={200}
          bottomTitle={90}
        />
      </Box> */}
    </Box>
  );
};
