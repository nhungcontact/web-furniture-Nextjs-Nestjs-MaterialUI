/* eslint-disable max-lines */
"use client";
import useProductDetail from "@/hooks/products/useProductDetail";
import { Box, Button, Container, Divider, Grid, LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import RatingReview from "../shared/RatingReview";
import { ProductDetailBanner } from "./ProductDetailBanner";
import ProductDetailNavBar from "./ProductDetailNavBar";
import ProductDetailRelated from "./ProductDetailRelated";
import { ProductImage } from "./ProductImage";
import { ProductInformation } from "./ProductInformation";
// import { ProductMaterial } from "./ProductMaterial";
import InputQuantity from "../shared/InputQuantity";
// import { ProductSize } from "./ProductSize";
import useCartAddCartItemToCart from "@/hooks/carts/useCartAddCartItemToCart";
import useUserInfor from "@/hooks/users/useUserInfor";
import { CartItemInCart, CartItemUpdateInput } from "@/types/cart-item";
import { OptionValueUpdateInput } from "@/types/option-value";
import { GetProductSku } from "@/types/product-sku";
import { GetReview } from "@/types/review";
import { jsonForm } from "@/utils/form";
import getCart from "@/utils/getCart";
import mergeOptionValue from "@/utils/merge-option-value";
import { useSnackbar } from "notistack";
import { FormEvent, useState } from "react";
import ProductDetailSkuValue from "./ProductDetailSkuValue";
import { ProductDetailReviews } from "./product-detail-review/ProductDetailReviews";
export const ProductDetail = () => {
  const param = useParams();
  const { data: user } = useUserInfor();
  const { data, error, isLoading, isValidating } = useProductDetail(param.id as any);
  const [productSku, setProductSku] = useState<GetProductSku | null>(null);
  const [optionValues, setOptionValues] = useState<OptionValueUpdateInput[]>([]);
  const { trigger: addCartItem } = useCartAddCartItemToCart(user ? user._id : "");
  const { enqueueSnackbar } = useSnackbar();

  const getValue = (optionValue: string, index: number) => {
    if (data) {
      if (mergeOptionValue(data)) {
        let arr = [] as any[];
        if (optionValues.length < mergeOptionValue(data).length) {
          arr = [...optionValues, ""];
        } else {
          arr = optionValues;
        }
        const updateValue = [...arr];
        updateValue[index] = optionValue;
        setOptionValues(updateValue);
        if (updateValue && updateValue.length === mergeOptionValue(data).length) {
          // Compare updateValue with data.productSkus
          for (const productSku of data.productSkus) {
            const match = updateValue.every((value, i) => {
              return value === productSku.optionValues[i]._id; // Adjust this comparison based on your data structure
            });

            if (match) {
              console.log("All values match!");
              // Set the state with the matched productSku
              setProductSku(productSku);
              return productSku; // Return the matched productSku
            }
          }
          setProductSku(null);
          console.log("Not all values match!");
        }
      }
    }
    return null;
  };
  const handleAddCartPD = (name: string) => {
    const data = getCart();
    if (data) {
      if (!!data && !!data.detailCarts && !!data.detailCarts.length && !!user) {
        const result = data.detailCarts.reduce((value, current) => {
          return value.concat({
            productSku: current.productSku._id,
            quantity: current.quantity,
          });
        }, [] as CartItemUpdateInput[]);
        addCartItem({
          body: {
            totalPrice: data.totalPrice,
            detailCarts: result,
            user: user._id,
          },
        })
          .then(() => {
            enqueueSnackbar(name, {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
          })
          .catch((e) => {
            enqueueSnackbar(e?.message, {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
          });
      }
    }
  };

  const handleAddCart = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);

    if (productSku) {
      const cartItemsLocal = localStorage.getItem("cartItems");
      if (cartItemsLocal) {
        const cartItemsParse = JSON.parse(cartItemsLocal) as CartItemInCart[];

        // Check for duplicates
        const existingCartItemIndex = cartItemsParse.findIndex(
          (item) => item.productSku._id === productSku._id,
        );

        if (existingCartItemIndex !== -1) {
          const updatedCartItems = [...cartItemsParse];
          updatedCartItems[existingCartItemIndex].quantity += Number(json.quantity);
          localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
          // Not a duplicate, add a new item to the cart
          localStorage.setItem(
            "cartItems",
            JSON.stringify([
              ...cartItemsParse,
              {
                price: productSku.priceDiscount
                  ? productSku.priceDiscount
                  : productSku.price,
                quantity: Number(json.quantity),
                productSku: productSku,
                product: data,
              } as CartItemInCart,
            ]),
          );
          handleAddCartPD("Add cart");
        }
      } else {
        // No existing cart items, add a new item to the cart
        localStorage.setItem(
          "cartItems",
          JSON.stringify([
            {
              price: productSku.priceDiscount
                ? productSku.priceDiscount
                : productSku.price,
              quantity: Number(json.quantity),
              productSku: productSku,
              product: data,
            } as CartItemInCart,
          ]),
        );
        handleAddCartPD("Add cart");
      }
      //   router.push("/cart");
    } else {
      alert("Product SKU not exists");
    }
  };

  const calculateAverageRating = (reviews: GetReview[]) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <>
      {(isValidating || isLoading) && (
        <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
      )}
      <ProductDetailBanner />
      <Container
        maxWidth={"xl"}
        sx={{ paddingY: "50px" }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            mb={4}
          >
            {data && (
              <ProductImage
                item={data.productSkus}
                productSku={productSku}
                data={data}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Container maxWidth={"xl"}>
              <Typography
                variant="body2"
                fontWeight={600}
              >
                {data?.isArrival ? "New Arrival" : ""}
              </Typography>
              <Typography variant="h3">{data?.name ?? "-"}</Typography>
              {!!productSku && !!productSku.reviews && !!productSku.reviews.length && (
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"end"}
                  columnGap={1}
                >
                  <RatingReview defaultValue={4.5} />
                  <Typography
                    variant="body1"
                    marginRight={4}
                    fontWeight={600}
                  >
                    ({calculateAverageRating(productSku.reviews)})
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecorationLine: "underline",
                      textTransform: "capitalize",
                      color: "#555555",
                    }}
                  >
                    {productSku.reviews.length} reviews
                  </Typography>
                </Box>
              )}
              {data && (
                <Box marginY={2}>
                  {productSku ? (
                    <>
                      {!productSku.percent && (
                        <Typography
                          variant="body1"
                          color="primary"
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(productSku.price)}
                        </Typography>
                      )}
                      {!!productSku.priceDiscount && (
                        <>
                          <Typography
                            variant="body1"
                            display={"inline-flex"}
                            sx={{ mr: 2, color: "#AF1A31" }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(productSku.priceDiscount)}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="primary"
                            sx={{ textDecorationLine: "line-through", mr: 2 }}
                            display={"inline-flex"}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(productSku.price)}
                            {/* {productSku.price} */}
                          </Typography>
                          <Typography
                            variant="body1"
                            display={"inline-flex"}
                          >
                            Up to {productSku.percent}% Off
                          </Typography>
                        </>
                      )}
                    </>
                  ) : (
                    <Typography
                      variant="body1"
                      color="primary"
                    >
                      {data.productSkus.length > 1 ? (
                        <>
                          $
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            Math.min(
                              ...data.productSkus?.map((val) =>
                                val.priceDiscount ? val.priceDiscount : val.price,
                              ),
                            ) ?? 0,
                          )}{" "}
                          -{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            Math.max(
                              ...(data.productSkus?.map((val) =>
                                val.priceDiscount ? val.priceDiscount : val.price,
                              ) ?? 0),
                            ),
                          )}
                        </>
                      ) : (
                        <>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(data.productSkus[0].price) ?? "-"}
                        </>
                      )}
                    </Typography>
                  )}

                  <Typography
                    variant="body2"
                    component={"div"}
                    marginTop={1}
                  >
                    Quantity Sold:{" "}
                    <b>
                      {productSku
                        ? productSku.quantitySold
                        : data.productSkus.reduce((accumulator, item) => {
                            // Assuming each item has a property 'quantitySold'
                            return (
                              accumulator + (item.quantitySold ? item.quantitySold : 0)
                            );
                          }, 0)}
                    </b>
                  </Typography>

                  <Typography
                    variant="body2"
                    component={"div"}
                    marginTop={1}
                  >
                    Quantity :{" "}
                    <b>
                      {productSku
                        ? productSku.quantityInStock
                        : data.productSkus.reduce((accumulator, item) => {
                            // Assuming each item has a property 'quantitySold'
                            return accumulator + item.quantityInStock;
                          }, 0)}
                    </b>
                  </Typography>
                </Box>
              )}
              <Divider />
              {data &&
                mergeOptionValue(data) &&
                mergeOptionValue(data).map((item, i) => (
                  <ProductDetailSkuValue
                    key={i}
                    item={item}
                    index={i}
                    getValue={getValue}
                  />
                ))}
              <form
                onSubmit={handleAddCart}
                id="add-cart"
              >
                <Box marginTop={2}>
                  <Typography
                    variant="body2"
                    component={"div"}
                    fontWeight={600}
                    marginBottom={2}
                  >
                    Select Quantity:{" "}
                  </Typography>
                  <InputQuantity data={productSku} />
                </Box>

                <Box
                  marginTop={4}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"start"}
                  columnGap={4}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ padding: "10px 60px", borderRadius: "3px" }}
                    disabled={productSku ? false : true}
                  >
                    <Typography
                      variant="body1"
                      color="secondary"
                      textTransform={"uppercase"}
                    >
                      Buy Now
                    </Typography>
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ padding: "10px 60px", borderRadius: "3px" }}
                    type="submit"
                    form="add-cart"
                    disabled={productSku ? false : true}
                  >
                    <Typography
                      variant="body1"
                      color={"white"}
                      textTransform={"uppercase"}
                    >
                      Add to cart
                    </Typography>
                  </Button>
                </Box>
              </form>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <ProductDetailNavBar />
      <Divider />
      <ProductInformation item={data} />
      <Container
        maxWidth={"lg"}
        sx={{ marginY: "40px" }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          marginBottom={2}
        >
          Why like?
        </Typography>
        {data && <ProductDetailRelated item={data} />}
      </Container>
      <Divider />
      {data && <ProductDetailReviews item={data.productSkus} />}
    </>
  );
};
