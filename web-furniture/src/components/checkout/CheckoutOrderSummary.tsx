/* eslint-disable max-lines */
import { primary, secondary } from "@/config/theme";
import usePaymentCreateCart from "@/hooks/bills/usePaymentCreateCart";
import { BillUpdateInput } from "@/types/bill";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
// import { useRouter } from "next/navigation";
// import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
type Props = {
  handleCheckout: (name: string, bill?: BillUpdateInput) => void;
  shipping: number;
};
export default function CheckoutOrderSummary({ handleCheckout, shipping }: Props) {
  const [bill, setBill] = useState<BillUpdateInput>();

  useEffect(() => {
    const billLocal = localStorage.getItem("bill");
    if (billLocal && JSON.parse(billLocal)) {
      const billParse = JSON.parse(billLocal) as BillUpdateInput;
      setBill(billParse);
    }
  }, []);

  return (
    <>
      {bill && (
        <Card>
          <CardHeader
            title="Order Summary"
            titleTypographyProps={{ variant: "h5", fontWeight: "600" }}
            sx={{ padding: 2 }}
          />

          <CardContent sx={{ pX: 1, py: 0 }}>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
              pt={2}
            >
              <Typography
                variant="body1"
                marginBottom={1}
              >
                Price ({bill.billItems?.length ?? 0} item)
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"600"}
                marginBottom={1}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(bill.price as number)}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                variant="body1"
                marginBottom={1}
              >
                Delivery charges
              </Typography>
              <Typography
                variant="body1"
                marginBottom={1}
                color="primary.light"
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(shipping)}
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
              <Typography
                variant="body1"
                marginBottom={1}
              >
                Discount price
                {bill.promotion?.percentDiscount && (
                  <b> ({bill.promotion.percentDiscount}%)</b>
                )}
              </Typography>
              <Typography
                variant="body1"
                marginBottom={1}
              >
                -
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(bill.promotionPrice ? bill.promotionPrice : 0)}
              </Typography>
            </Box>
            <Divider />
            <Box
              display="flex"
              justifyContent="space-between"
              mb={1}
              py={1}
            >
              <Typography
                variant="body1"
                marginBottom={1}
              >
                Total Amount
              </Typography>
              <Typography
                variant="body1"
                marginBottom={1}
                fontWeight={"bold"}
              >
                {shipping
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Math.ceil((bill?.grandTotal as number) + shipping))
                  : new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(bill?.grandTotal as number)}
              </Typography>
            </Box>
            <Box mt={4}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2, paddingY: "12px" }}
                onClick={() => handleCheckout("checkout", bill)}
              >
                <Typography
                  textTransform="capitalize"
                  variant="body2"
                  fontWeight="bold"
                >
                  checkout
                </Typography>
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ paddingY: "12px", ":hover": { background: `${secondary[400]}` } }}
                onClick={() => handleCheckout("checkoutStripe", bill)}
              >
                <Typography
                  textTransform="capitalize"
                  variant="body2"
                  // marginLeft={1}
                  color="primary"
                  fontWeight="bold"
                >
                  checkout with stripe
                </Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}
