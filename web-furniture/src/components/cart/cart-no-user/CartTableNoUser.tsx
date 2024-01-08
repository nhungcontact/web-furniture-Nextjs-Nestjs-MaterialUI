/* eslint-disable max-lines */
"use client";
import useCartAddCartItemToCart from "@/hooks/carts/useCartAddCartItemToCart";
import useCartDetail from "@/hooks/carts/useCartDetail";
import { BillUpdateInput } from "@/types/bill";
import { BillItemCreateInput } from "@/types/bill-item";
import { CartItemUpdateInput, GetCartItem } from "@/types/cart-item";
import { GetProduct } from "@/types/product";
import { GetProductSku } from "@/types/product-sku";
import { Promotion } from "@/types/promotion";
import { GetUser } from "@/types/user";
import getCart from "@/utils/getCart";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { useRouter } from "next-intl/client";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import AutocompleteVoucher from "../AutocompleteVoucher";
import CartTableHead from "../CartTableHead";
import Voucher from "../Voucher";
import CartTableBodyNoUser from "./CartTableBodyNoUser";
import Image from "next/image";
type Props = {
  user?: GetUser;
};
export default function CartTableNoUser({ user }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const [voucher, setVoucher] = useState<Promotion>();
  const [priceVoucher, setPriceVoucher] = useState<number>();
  const [selected, setSelected] = useState<GetCartItem[]>([]);
  const [totalPrice, setToltalPrice] = useState<number>();
  const [grandTotal, setGrandTotal] = useState<number>();

  const { trigger: addCartItem } = useCartAddCartItemToCart(user ? user._id : "");
  const { data: dataCart, isLoading } = useCartDetail(user ? user._id : "");

  const handleAddCart = (name: string) => {
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
            window.location.reload();
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
  //   useEffect(() => {
  //     handleAddCart("add cart");
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.checked &&
      getCart() &&
      getCart().detailCarts &&
      getCart().detailCarts.length
    ) {
      if (getCart() && getCart().detailCarts) {
        const newSelected = getCart().detailCarts.map((n) => n);
        setSelected(newSelected);
        let total = 0;
        for (const val of getCart().detailCarts) {
          if (val.productSku.priceDiscount) {
            total += val.productSku.priceDiscount * val.quantity;
          } else {
            total += val.productSku.price * val.quantity;
          }
        }
        setToltalPrice(total);
      }
      if (dataCart && dataCart.detailCarts) {
        const newSelected = dataCart.detailCarts.map((n) => n);
        setSelected(newSelected);
        let total = 0;
        for (const val of dataCart.detailCarts) {
          if (val.productSku.priceDiscount) {
            total += val.productSku.priceDiscount * val.quantity;
          } else {
            total += val.productSku.price * val.quantity;
          }
        }
        setToltalPrice(total);
      }

      return;
    }
    setSelected([]);
  };

  const handleGetProductSku = (
    optionValues: string[],
    index: number,
    item: GetProductSku,
    product: GetProduct,
  ) => {
    if (getCart() && getCart().detailCarts && getCart().detailCarts.length) {
      const isDuplicate = getCart().detailCarts.some((val) => {
        return (
          val.product &&
          val.product._id === item.product._id &&
          val.productSku.optionValues.every((elem) =>
            optionValues.find((item) => elem._id === item),
          )
        );
      });
      if (!isDuplicate) {
        for (const productSku of product.productSkus) {
          const match = optionValues.every((value1, i) => {
            return value1 === productSku.optionValues[i]._id;
          });
          if (match) {
            const updateData = [...getCart().detailCarts];
            updateData[index] = {
              ...updateData[index],
              product: product,
              price: productSku.priceDiscount
                ? productSku.priceDiscount
                : productSku.price,
              productSku: productSku,
            };
            localStorage.setItem("cartItems", JSON.stringify(updateData));
            handleAddCart(`Update variants successfully!`);
            // window.location.reload();
          }
        }
      } else {
        alert("The product already exists in the shopping cart!");
        window.location.reload();
      }
    }
  };

  const handleGetQuantity = (value: number, index: number) => {
    if (getCart() && getCart().detailCarts) {
      const updateData = [...getCart().detailCarts];

      updateData[index] = {
        ...updateData[index],
        quantity: value,
      };

      localStorage.setItem("cartItems", JSON.stringify(updateData));
      handleAddCart("Update quantity successfully!");
      //   window.location.reload();
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, data: GetCartItem) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected: GetCartItem[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    let total = 0;
    for (const val of newSelected) {
      if (val.productSku.priceDiscount) {
        total += val.productSku.priceDiscount * val.quantity;
      } else {
        total += val.productSku.price * val.quantity;
      }
    }
    setToltalPrice(total);
    setSelected(newSelected);
  };

  const handleCheckout = (cart: GetCartItem[]) => {
    if (cart && user) {
      const billItems = localStorage.getItem("bill");
      if (billItems) {
        localStorage.removeItem("bill");
      }
      let total = 0;
      for (const val of cart) {
        if (val.productSku.priceDiscount) {
          total += val.productSku.priceDiscount * val.quantity;
        } else {
          total += val.productSku.price * val.quantity;
        }
      }
      if (total !== 0) {
        const result = cart.reduce((value, current) => {
          return value.concat({
            productSkuId: current.productSku._id,
            // productSku: current.productSku,
            quantity: current.quantity,
            price: current.productSku.priceDiscount
              ? current.productSku.priceDiscount
              : current.productSku.price,
            totalPrice: current.productSku.priceDiscount
              ? current.productSku.priceDiscount * current.quantity
              : current.productSku.price * current.quantity,
          } as BillItemCreateInput);
        }, [] as BillItemCreateInput[]);
        if (result && result.length) {
          let bill = {} as BillUpdateInput;
          if (voucher && priceVoucher) {
            bill = {
              user: user._id,
              grandTotal: Math.ceil(total - priceVoucher),
              price: total,
              promotionPrice: priceVoucher,
              promotion: voucher,
              billItems: result as BillItemCreateInput[],
            };
          } else {
            bill = {
              user: user._id,
              grandTotal: total,
              price: total,
              billItems: result as BillItemCreateInput[],
            };
          }
          localStorage.setItem("bill", JSON.stringify(bill));
          router.push("/checkout");
        }
      }
    } else {
      alert("Go to sign in or create new an account");
    }
  };

  const isSelected = (name: GetCartItem) => selected.indexOf(name) !== -1;

  const handleGetVoucher = (data: Promotion) => {
    setVoucher(data);
  };
  const getPriceVoucher = (number: number) => {
    setPriceVoucher(number);
    if (totalPrice && selected.length) {
      setGrandTotal(Math.ceil(totalPrice - number));
    }
  };

  const handleRemove = (val: number) => {
    const cart = getCart();
    if (cart && cart.detailCarts && cart.detailCarts.length) {
      const removeCart = cart.detailCarts.filter((_, i) => i !== val);
      const getremoveCart = cart.detailCarts.filter((_, i) => i === val);
      localStorage.setItem("cartItems", JSON.stringify(removeCart));
      handleAddCart(`Remove ${getremoveCart[0].productSku.product.name} successfully!`);
    }
  };
  return (
    <>
      <Box sx={{ width: "100%", pt: 4 }}>
        {(!!dataCart && dataCart.detailCarts.length > 0) ||
        (!!getCart() && getCart().detailCarts.length > 0) ? (
          <>
            <Paper variant="outlined">
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                >
                  <CartTableHead
                    onSelectAllClick={handleSelectAllClick}
                    rowCount={getCart()?.detailCarts?.length ?? 0}
                    numSelected={selected.length}
                  />

                  {!user ? (
                    <TableBody>
                      {!!getCart() &&
                        !!getCart().detailCarts &&
                        getCart().detailCarts.map((item, i) => {
                          const isItemSelected = isSelected(item);

                          return (
                            <CartTableBodyNoUser
                              key={item.productSku._id}
                              data={item}
                              onClickSelect={handleClick}
                              isItemSelected={isItemSelected}
                              handleGetQuantity={handleGetQuantity}
                              index={i}
                              handleGetProductSku={handleGetProductSku}
                              handleRemove={handleRemove}
                            />
                          );
                        })}
                    </TableBody>
                  ) : (
                    <TableBody>
                      {!!dataCart &&
                        !!dataCart.detailCarts &&
                        dataCart.detailCarts.map((item, i) => {
                          const isItemSelected = isSelected(item);

                          return (
                            <CartTableBodyNoUser
                              key={item.productSku._id}
                              data={item}
                              onClickSelect={handleClick}
                              isItemSelected={isItemSelected}
                              handleGetQuantity={handleGetQuantity}
                              index={i}
                              handleGetProductSku={handleGetProductSku}
                              handleRemove={handleRemove}
                            />
                          );
                        })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              <Divider />
            </Paper>
            <Divider />
          </>
        ) : (
          <>
            <Box
              textAlign={"center"}
              mt={4}
            >
              <Image
                src="/images/empty.png"
                alt="no products"
                width={150}
                height={150}
              />
              <Typography
                variant="h3"
                color="gray"
                mb={2}
              >
                No products
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push("/furniture")}
              >
                <b>Continue Shopping</b>
              </Button>
            </Box>
          </>
        )}
      </Box>

      {user && (
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ py: 4 }}
        >
          <Grid
            item
            xs={12}
            md={6}
            mb={2}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
            >
              Voucher
            </Typography>

            <AutocompleteVoucher
              getValue={handleGetVoucher}
              isDisabled={selected.length ? false : true}
              user={user}
            />
            {!!voucher && !!selected.length && (
              <Box sx={{ my: 1 }}>
                <Typography
                  variant="body2"
                  color="grey"
                  mb={1}
                  ml={2}
                >
                  Add Voucher
                </Typography>

                <Voucher
                  voucher={voucher}
                  getPriceVoucher={getPriceVoucher}
                  totalPrice={totalPrice}
                  //   user={user}
                />
              </Box>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box sx={{ padding: 3 }}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                mb={4}
              >
                Subtotal
              </Typography>
              <Box>
                <Box
                  display="flex"
                  mb={2}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography>{selected.length} product</Typography>
                  <Typography fontWeight={"bold"}>
                    {!!selected.length && !!totalPrice && (
                      <Typography fontWeight={"bold"}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(totalPrice)}
                      </Typography>
                    )}

                    {!selected.length && (
                      <Typography fontWeight={"bold"}>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(0)}
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  mb={4}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography>Price Discount</Typography>
                  <Typography fontWeight={"bold"}>
                    -
                    {priceVoucher
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(priceVoucher)
                      : new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(0)}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  mb={4}
                >
                  <Typography
                    //   variant="h5"
                    fontWeight={"bold"}
                  >
                    Grand Total
                  </Typography>
                  {selected.length ? (
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                    >
                      {grandTotal
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(grandTotal)
                        : new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(totalPrice as number)}
                    </Typography>
                  ) : (
                    <b>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(0)}
                    </b>
                  )}
                </Box>
                <Box textAlign={"end"}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCheckout(selected)}
                    disabled={selected && selected.length > 0 ? false : true}
                    sx={{ borderRadius: 0 }}
                  >
                    Process Order
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
