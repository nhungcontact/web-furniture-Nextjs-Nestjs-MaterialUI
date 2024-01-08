/* eslint-disable max-lines */
"use client";
import { primary, secondary } from "@/config/theme";
import useUserAddProductFavorite from "@/hooks/users/useUserAddProductFavorite";
import useUserInfor from "@/hooks/users/useUserInfor";
import { GetProduct } from "@/types/product";
import mergeOptionValue, { MergeValues } from "@/utils/merge-option-value";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import * as React from "react";
import BoxColor from "./BoxColor";
import CheckBoxColor from "./CheckBoxColor";
import RatingReview from "./RatingReview";
import { useEffect, useState } from "react";
type Props = {
  item: GetProduct;
  seller?: number;
};
export default function ProductCardHover({ item }: Props) {
  const router = useRouter();
  const { data: user } = useUserInfor();
  const [isHover, setIsHover] = React.useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(
    user && user.products && user.products.length
      ? user.products.map((item1) => item1._id === item._id)[0]
      : false,
  );

  const { trigger: updateFavorite } = useUserAddProductFavorite(user ? user._id : "");
  const handleUpdateFavorite = () => {
    if (user && user._id) {
      updateFavorite({
        body: {
          product: item._id,
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
      const hasFavorite = user.products.some((item1) => item1._id === item._id);
      setChecked(hasFavorite);
    }
  }, [item._id, user]);

  return (
    <Card sx={{ maxWidth: 335, boxShadow: "none" }}>
      <Box
        position={"relative"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.productSkus[0] && (
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={item.productSkus[0]?.photos[0]?.imageURL ?? "/"}
            style={{
              objectFit: "fill",
              height: "-webkit-fill-available",
              width: "-webkit-fill-available",
            }}
          />
        )}
        {item.productSkus[0]?.percent !== 0 && (
          <Box
            position={"absolute"}
            top={"10px"}
            right={"10px"}
            sx={{ backgroundColor: `${secondary[400]}`, padding: "0px 10px" }}
          >
            <Typography
              variant="caption"
              color={"primary.light"}
              fontWeight={"700"}
            >
              {item?.productSkus[0]?.percent}%
            </Typography>
          </Box>
        )}

        <Box
          bgcolor={"rgba(0, 0, 0, .1)"}
          position={"absolute"}
          bottom={"0px"}
          display={isHover ? "flex" : "none"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"-webkit-fill-available"}
          py={1}
        >
          <Tooltip
            title="Add list favorite"
            placement="top"
          >
            <IconButton>
              <CheckBoxColor
                checked={checked}
                onChange={handleUpdateFavorite}
                icon={<FavoriteBorder fontSize={"small"} />}
                checkedIcon={<Favorite fontSize={"small"} />}
                sx={{
                  color: `${primary[400]}`,
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  "&.Mui-checked": {
                    color: `${primary[400]}`,
                    backgroundColor: `${secondary[400]}`,
                  },
                  "&:hover": {
                    color: `${primary[400]}`,
                    backgroundColor: `${secondary[400]}`,
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="View detail"
            placement="top"
          >
            <IconButton
              sx={{
                "&:hover": {
                  color: `${primary[400]}`,
                  backgroundColor: `${secondary[400]}`,
                },
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "7px",
                color: `${primary[400]}`,
              }}
              onClick={() => router.push(`/furniture/product/product-detail/${item._id}`)}
            >
              <RemoveRedEyeOutlinedIcon fontSize={"small"} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <CardContent sx={{ padding: "8px" }}>
        <Grid container>
          {mergeOptionValue(item) &&
            mergeOptionValue(item).map((item: MergeValues, i) => (
              <Grid
                item
                xs={12}
                key={i}
              >
                <BoxColor item={item} />
              </Grid>
            ))}
        </Grid>
        <Typography
          variant="body1"
          fontWeight={"bold"}
        >
          {item?.name ?? "-"}
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box textAlign={"start"}>
            {item.productSkus.length > 1 ? (
              <Typography
                variant="body1"
                color="primary"
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  Math.min(
                    ...(item.productSkus?.map((val) =>
                      val.priceDiscount ? val.priceDiscount : val.price,
                    ) ?? 0),
                  ),
                )}{" "}
                -{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  Math.max(
                    ...(item.productSkus?.map((val) =>
                      val.priceDiscount ? val.priceDiscount : val.price,
                    ) ?? 0),
                  ),
                )}
              </Typography>
            ) : (
            <Typography
                variant="body2"
                color="primary"
              >
                {item.productSkus[0]?.priceDiscount
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.productSkus[0]?.priceDiscount as number)
                  : new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.productSkus[0]?.price as number)}
              </Typography>
            )}
          </Box>
          {!!item.reviews && !!item.reviews.length && (
            <Box>
              <RatingReview
                size="small"
                defaultValue={item.reviews.length > 0 ? item.reviews[0].rating : 0}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
