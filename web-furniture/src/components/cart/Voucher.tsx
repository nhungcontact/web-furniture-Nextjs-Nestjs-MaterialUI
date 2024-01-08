/* eslint-disable max-lines */
import { Promotion, PromotionType } from "@/types/promotion";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
type Props = {
  voucher: Promotion;
  getPriceVoucher: (val: number) => void;
  totalPrice?: number;
};
export default function Voucher({ voucher, getPriceVoucher, totalPrice }: Props) {
  const [isAllow, setIsAllow] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [priceExp, setPriceExp] = useState<number>();
  const handleGetVoucher = () => {
    if (voucher.numberDiscountByNumber) {
      setIsDisabled(true);
      getPriceVoucher(voucher.numberDiscountByNumber);
      enqueueSnackbar("successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (voucher.priceMaximumByPercent) {
      setIsDisabled(true);
      getPriceVoucher(voucher.priceMaximumByPercent);
      enqueueSnackbar("successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
  const handleRemoveVoucher = () => {
    setIsDisabled(false);
    getPriceVoucher(0);
    enqueueSnackbar("Remove Voucher", {
      variant: "info",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  useEffect(() => {
    if (totalPrice && totalPrice < voucher.priceMinimumApply) {
      setIsAllow(false);
      setPriceExp(Math.ceil(voucher.priceMinimumApply - totalPrice));
    }
  }, [totalPrice, voucher.priceMinimumApply]);
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          mb={1}
        >
          {!isAllow && (
            <Typography color="red">
              Buy an additional{" "}
              <b>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(priceExp ? priceExp : 0)}
              </b>{" "}
              to get a discount of{" "}
              <b>
                {voucher.numberDiscountByNumber
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      voucher.numberDiscountByNumber ? voucher.numberDiscountByNumber : 0,
                    )
                  : new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      voucher.priceMaximumByPercent ? voucher.priceMaximumByPercent : 0,
                    )}
              </b>
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography variant="caption">
            <b>Code expiration date: </b>
            <br />
            {new Date(voucher.dateApply).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
            {" - "}
            {new Date(voucher.dateExpire).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography variant="caption">
            <b>Coupon code:</b> <br /> {voucher.couponCode}
          </Typography>
        </Grid>
        {voucher.type === PromotionType.Number && (
          <>
            <Grid
              item
              xs={12}
              mb={2}
            >
              <Typography variant="caption">
                <b>Endow:</b>
              </Typography>
              <br />
              <Typography variant="caption">
                Limited usage. Hurry up or you won`t miss it! Discount{" "}
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    voucher.numberDiscountByNumber ? voucher.numberDiscountByNumber : 0,
                  )}
                </b>
                , minimum order{" "}
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(voucher.priceMinimumApply)}
                </b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="caption">
                <b>See details :</b>
              </Typography>
              <br />
              <Typography variant="caption">
                Instant discount of{" "}
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    voucher.numberDiscountByNumber ? voucher.numberDiscountByNumber : 0,
                  )}
                </b>{" "}
                for orders from{" "}
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(voucher.priceMinimumApply)}
                </b>
                . Applicable until{" "}
                <b>
                  {new Date(voucher.dateExpire).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </b>
                . Each account can only be <b>used once</b>. Discount codes are issued by
                the Seller and will not be <b>refunded</b> for any reason.
              </Typography>
            </Grid>
          </>
        )}
        {voucher.type === PromotionType.Percent && (
          <>
            <Grid
              item
              xs={12}
              mb={2}
            >
              <Typography variant="caption">
                <b>Endow:</b>
              </Typography>
              <br />
              <Typography variant="caption">
                Limited usage. Hurry up or you won`t miss it!{" "}
                <b>${voucher.percentDiscount}%</b> Off, minimum order{" "}
                <b>${voucher.priceMinimumApply}</b>, maximum discount{" "}
                <b>${voucher.priceMaximumByPercent}</b>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="caption">
                <b>See details :</b>
              </Typography>
              <br />
              <Typography variant="caption">
                Instant discount of <b>{voucher.percentDiscount}%</b> maximum{" "}
                <b>${voucher.priceMaximumByPercent}</b> for orders from{" "}
                <b>${voucher.priceMinimumApply}</b>. Applicable until{" "}
                <b>
                  {new Date(voucher.dateExpire).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </b>
                . Each account can only be <b>used once</b>. Discount codes are issued by
                the Seller and will not be <b>refunded</b> for any reason.
              </Typography>
            </Grid>
          </>
        )}
        {isAllow && (
          <Grid
            item
            xs={12}
            mt={4}
            mb={1}
          >
            <Grid
              container
              spacing={2}
            >
              {isDisabled && (
                <Grid
                  item
                  xs={6}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleRemoveVoucher}
                    sx={{
                      textTransform: "capitalize",
                      borderRadius: 0,
                    }}
                    color="secondary"
                  >
                    Remove
                  </Button>
                </Grid>
              )}
              <Grid
                item
                xs={isDisabled ? 6 : 12}
              >
                <Button
                  disabled={isDisabled}
                  fullWidth
                  variant="contained"
                  onClick={handleGetVoucher}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: 0,
                  }}
                  color="secondary"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
