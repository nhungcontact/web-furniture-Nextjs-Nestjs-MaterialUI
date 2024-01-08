/* eslint-disable max-lines */
"use client";

import useBillCreate from "@/hooks/bills/useBillCreate";
import useBillUpdate from "@/hooks/bills/useBillUpdate";
import usePaymentCreateCart from "@/hooks/bills/usePaymentCreateCart";
import useShippingList from "@/hooks/shippings/useShippingList";
import useUserInfor from "@/hooks/users/useUserInfor";
import { GetAddress } from "@/types/address";
import {
  BillCreateInput,
  BillPaymentMethod,
  BillStatus,
  BillUpdateInput,
} from "@/types/bill";
import { BillItemCreateInput } from "@/types/bill-item";
import { CartItemInCart } from "@/types/cart-item";
import getCart from "@/utils/getCart";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import CheckoutAddressInformation from "./CheckoutAddressInformation";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import FormCheckoutWithStripe from "./checkout-with-stripe/FormCheckoutWithStripe";

export default function Checkout() {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { data: dataShipping } = useShippingList({});
  const { data: user, isLoading } = useUserInfor();
  const [openStripe, setStripe] = useState<boolean>(false);

  const { trigger: createBill } = useBillCreate();
  const { trigger: updateBill } = useBillUpdate();
  const [address, setAddress] = useState<GetAddress>();
  const [message, setMessage] = useState<string>();
  const [shipping, setShipping] = useState<number>(20);
  const { trigger: createCartPayment } = usePaymentCreateCart();
  const [billData, setBillData] = useState<BillCreateInput>();
  const [billItem, setBillItem] = useState<BillItemCreateInput[]>();

  const handleClose = () => {
    setStripe(false);
  };

  const handleCheckout = (name: string, bill?: BillUpdateInput) => {
    if (address && bill && bill.billItems && bill.billItems.length) {
      let data = {} as any;
      const number = (Math.random() + 1000000).toString(36).substring(7);
      data = {
        user: bill.user as string,
        grandTotal: Math.ceil((bill.grandTotal as number) + shipping) as number,
        billItems: [],
        price: bill.price as number,
        number: number,
        status: BillStatus.Waiting,
        address: {
          commune: address.commune,
          district: address.district,
          province: address.province,
          addressDetail: address.addressDetail,
          isDefault: address.isDefault,
        },
        message: message,
        shipping: shipping,
        ...(bill.promotion ? { promotion: bill.promotion } : {}),
        ...(bill.promotionPrice ? { promotionPrice: bill.promotionPrice } : {}),
      };
      setBillData(data);
      setBillItem(bill.billItems as BillItemCreateInput[]);
      if (name === "checkoutStripe") {
        // checkout with srtipe -> create paymentIntentID
        createCartPayment({
          body: { ...data, paymentMethod: BillPaymentMethod.Card },
        })
          .then((res) => {
            setStripe(true);
            if (res) {
              localStorage.setItem("cartPayment", JSON.stringify(res));
              setStripe(true);
            }
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
      } else {
        // checkout
        createBill({
          body: { ...data, paymentMethod: BillPaymentMethod.Cod },
        })
          .then((res) => {
            if (res._id) {
              updateBill({
                body: {
                  billItems: bill.billItems,
                  billId: res._id,
                  user: bill.user,
                },
              })
                .then(() => {
                  const cart = getCart();
                  if (
                    cart &&
                    cart.detailCarts &&
                    cart.detailCarts.length &&
                    bill.billItems
                  ) {
                    let val = [] as CartItemInCart[];
                    for (const i of bill.billItems) {
                      val = cart.detailCarts.filter(
                        (item) => item.productSku._id !== i.productSkuId,
                      );
                    }
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("bill");
                    localStorage.setItem("cartItems", JSON.stringify(val));
                    enqueueSnackbar("successfully", {
                      variant: "success",
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                      },
                    });
                    window.location.href = "/";
                  }
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
    } else {
    }
  };
  const handleGetAddress = (data: GetAddress) => {
    setAddress(data);
  };
  useEffect(() => {
    if (dataShipping && dataShipping.items && address) {
      const data = dataShipping.items.filter(
        (item) => item.provinceApply === address.province,
      );
      if (!!data && !!data.length) {
        setShipping(data[0].price);
      } else {
        setShipping(20);
      }
    }
  }, [address, dataShipping]);
  return (
    <Box sx={{ background: "#F8F8F8" }}>
      <Divider />
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h3"
          textTransform="uppercase"
          fontFamily={"serif"}
          fontWeight={"400"}
          textAlign="center"
          mb={4}
        >
          Checkout Order
        </Typography>

        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={7}
            xs={12}
          >
            <CheckoutAddressInformation
              user={user}
              isLoading={isLoading}
              getAddress={handleGetAddress}
            />
            <Card sx={{ my: 6 }}>
              <CardHeader
                title="Your Message"
                titleTypographyProps={{ variant: "h5", fontWeight: "600" }}
              />
              <Divider sx={{ margin: 0 }} />
              <CardContent sx={{ padding: 2 }}>
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  marginBottom={1}
                >
                  Message
                </Typography>
                <TextField
                  value={message}
                  fullWidth
                  multiline
                  rows={4}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <CheckoutOrderSummary
              handleCheckout={handleCheckout}
              shipping={shipping}
            />
            <FormCheckoutWithStripe
              open={openStripe}
              handleClose={handleClose}
              bill={billData}
              billItems={billItem}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
