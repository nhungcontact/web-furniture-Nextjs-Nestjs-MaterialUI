/* eslint-disable max-lines */
"use client";

import { ArrowBack, Storefront } from "@mui/icons-material";
import { Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import FormCheckoutWithStripe from "./FormCheckoutWithStripe";
import getPayment from "@/utils/getPayment";
import usePaymentConfirm from "@/hooks/bills/usePaymentConfirm";
import { enqueueSnackbar } from "notistack";
import { CartPayment } from "@/types/bill";

export default function CheckoutWithStripe() {
  const [hover, setHover] = useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);
  const { trigger: confirm } = usePaymentConfirm();

  console.log(getPayment());

  const handleStripe = () => {
    if (getPayment() && getPayment()?.paymentIntentID) {
      confirm({
        body: {
          paymentIntentID: (getPayment() as CartPayment).paymentIntentID,
          paymentMethod: "dsadas",
        },
      })
        .then((res) => {
          if (res) {
            localStorage.remove("cartPayment");
            enqueueSnackbar("Successfully", {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            //   router.push("/checkout/checkout-with-stripe");
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
  };
  return (
    <>
      <Divider />
      <Container sx={{ py: 6 }}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
          >
            <Box
              display="flex"
              justifyContent="left"
              alignItems="center"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              sx={{
                opacity: ".25s ease,transform .25s ease,-webkit-transform .25s ease",
              }}
            >
              <ArrowBack
                sx={{
                  color: "hsla(0,0%,10%,0.9)",
                  fontSize: "18px",
                  opacity: `${hover ? 1 : 0.4}`,
                }}
              />
              {hover ? (
                <Typography
                  variant="caption"
                  fontWeight="bold"
                >
                  Come back
                </Typography>
              ) : (
                <IconButton
                  sx={{
                    background: "#ffffff",
                    boxShadown: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    width: "28px",
                    height: "28px",
                    borderRadius: "100%",
                  }}
                >
                  <Storefront sx={{ fontSize: "18px" }} />
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
          >
            <FormCheckoutWithStripe />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
