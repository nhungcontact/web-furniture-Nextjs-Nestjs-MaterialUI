import { GetProduct } from "@/types/product";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Grid, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CheckBoxColor from "./CheckBoxColor";
import useUserAddProductFavorite from "@/hooks/users/useUserAddProductFavorite";
import useUserInfor from "@/hooks/users/useUserInfor";

type Props = {
  item: GetProduct;
  seller?: number;
};
export default function ProductCard({ item }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: user } = useUserInfor();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

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
    <>
      {!!item.productSkus && !!item.productSkus.length && (
        <Card sx={{ maxWidth: 335, boxShadow: "none" }}>
          <CardMedia
            component="img"
            alt={item.productSkus[0].photos[0].name ?? "/"}
            height="300px"
            image={item.productSkus[0].photos[0].imageURL ?? "/"}
            style={{
              objectFit: "fill",
              width: "-webkit-fill-available",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          />
          <CardContent sx={{ textAlign: "center", padding: "8px" }}>
            <Grid
              container
              alignItems={"start"}
              justifyContent={"space-between"}
            >
              <Grid
                item
                xs={10}
                textAlign={"start"}
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  onClick={() =>
                    router.push(`/furniture/product/product-detail/${item._id}`)
                  }
                  sx={{ ":hover": { cursor: "pointer" } }}
                >
                  {item.name ?? "-"}
                </Typography>
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
                        ...item?.productSkus.map((item) =>
                          item.priceDiscount ? item.priceDiscount : item.price,
                        ),
                      ) ?? 0,
                    )}{" "}
                    -
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      Math.max(
                        ...item?.productSkus.map((item) =>
                          item.priceDiscount ? item.priceDiscount : item.price,
                        ),
                      ) ?? 0,
                    )}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
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
              </Grid>
              <Grid
                item
                xs={2}
                textAlign={"end"}
              >
                <IconButton>
                  <CheckBoxColor
                    checked={checked}
                    onChange={handleUpdateFavorite}
                    icon={<FavoriteBorder fontSize={"small"} />}
                    checkedIcon={<Favorite fontSize={"small"} />}
                    sx={{
                      color: "black",
                      border: "1px solid",
                      padding: "5px",
                      borderRadius: "50%",
                      "&.Mui-checked": {
                        color: "red",
                      },
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
}
