/* eslint-disable max-lines */
import React, { CSSProperties, useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs, type Swiper as SwiperRef } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { secondary } from "@/config/theme";
import { GetProduct } from "@/types/product";
import { GetProductSku } from "@/types/product-sku";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import Image from "next/image";
import { useSnackbar } from "notistack";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CheckBoxColor from "../shared/CheckBoxColor";
import useUserAddProductFavorite from "@/hooks/users/useUserAddProductFavorite";
import useUserInfor from "@/hooks/users/useUserInfor";
type Props = {
  item: GetProductSku[];
  productSku: GetProductSku | null;
  data: GetProduct;
};
export const ProductImage = ({ item, productSku, data }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperRef | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { data: user } = useUserInfor();
  const [checked, setChecked] = useState(false);

  const { trigger: updateFavorite } = useUserAddProductFavorite(user ? user._id : "");
  const handleUpdateFavorite = () => {
    if (user && user._id) {
      updateFavorite({
        body: {
          product: data._id,
        },
      })
        .then(() => {
          setChecked((prevChecked) => !prevChecked); // Use functional form of setChecked
          const actionMessage = checked ? "Remove favorite!" : "Added favorite!";
          enqueueSnackbar(actionMessage, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
        });
    }
  };

  useEffect(() => {
    if (user && user.products && user.products.length) {
      const hasFavorite = user.products.some((item1) => item1._id === data._id);
      setChecked(hasFavorite);
    }
  }, [data._id, user]);

  return (
    <Box
      sx={{
        "& .mySwiper .swiper-slide": {
          width: "25%",
          height: "100%",
          opacity: "0.4",
        },
        "& .mySwiper .swiper-slide-thumb-active": {
          opacity: "1",
        },
      }}
    >
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            height: "550px",
            marginBottom: "10px",
          } as CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {!!productSku &&
          productSku.photos.map((item) => (
            <SwiperSlide
              key={item._id}
              style={{ position: "relative" }}
            >
              <Image
                alt={item.name ?? "-"}
                fill
                unoptimized
                src={item.imageURL ?? "/"}
              />
              <Box
                position={"absolute"}
                top={2}
                right={2}
              >
                <IconButton>
                  <CheckBoxColor
                    checked={checked}
                    onChange={handleUpdateFavorite}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    sx={{
                      color: `${secondary[400]}`,
                      backgroundColor: "white",
                      padding: "7px",
                      borderRadius: "50%",
                      "&.Mui-checked": {
                        color: `red`,
                      },
                      "&:hover": {
                        backgroundColor: "white",
                        padding: "7px",
                        borderRadius: "50%",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "27px",
                      },
                    }}
                  />
                </IconButton>
              </Box>
            </SwiperSlide>
          ))}
        {!productSku &&
          item &&
          item.length &&
          item.map((val) => {
            return (
              <Box key={val._id}>
                {val.photos.map((item) => (
                  <SwiperSlide
                    key={item._id}
                    style={{ position: "relative" }}
                  >
                    <Image
                      alt={item.name ?? "-"}
                      fill
                      unoptimized
                      src={item.imageURL ?? "/"}
                    />
                    <Box
                      position={"absolute"}
                      top={2}
                      right={2}
                    >
                      <IconButton>
                        <CheckBoxColor
                          value={checked}
                          onChange={handleUpdateFavorite}
                          defaultChecked={checked}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          sx={{
                            color: `${secondary[400]}`,
                            backgroundColor: "white",
                            padding: "7px",
                            borderRadius: "50%",
                            "&.Mui-checked": {
                              color: `red`,
                            },
                            "&:hover": {
                              backgroundColor: "white",
                              padding: "7px",
                              borderRadius: "50%",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: "27px",
                            },
                          }}
                        />
                      </IconButton>
                    </Box>
                  </SwiperSlide>
                ))}
              </Box>
            );
          })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        style={{
          height: "120px",
        }}
      >
        {!!productSku &&
          !!productSku.photos &&
          !!productSku.photos.length &&
          productSku.photos.map((item) => (
            <SwiperSlide key={item._id}>
              <Image
                alt="photo"
                unoptimized
                src={item.imageURL}
                fill
              />
            </SwiperSlide>
          ))}

        {!productSku &&
          item?.length &&
          item.map((val) => {
            return (
              <Box key={val._id}>
                {val.photos.map((item) => (
                  <SwiperSlide key={item._id}>
                    <Image
                      alt="photo"
                      unoptimized
                      src={item.imageURL}
                      fill
                    />
                  </SwiperSlide>
                ))}
              </Box>
            );
          })}
      </Swiper>
    </Box>
  );
};
