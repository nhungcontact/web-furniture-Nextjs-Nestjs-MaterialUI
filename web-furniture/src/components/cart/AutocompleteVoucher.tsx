/* eslint-disable max-lines */
import { secondary } from "@/config/theme";
import useBillList from "@/hooks/bills/useBillList";
import usePromotionList from "@/hooks/promotions/usePromotionList";
import { CartItemInCart } from "@/types/cart-item";
import { Promotion, PromotionType } from "@/types/promotion";
import { GetUser } from "@/types/user";
import { Loyalty } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
type Props = {
  getValue: (data: Promotion) => void;
  isDisabled: boolean;
  user: GetUser;
};
export default function AutocompleteVoucher({
  getValue,
  isDisabled,

  user,
}: Props) {
  const [promotions, setPromotions] = useState<Promotion[]>();
  const { data, isLoading, isValidating } = usePromotionList({});
  const { data: bills } = useBillList({ user: user._id });

  const [value, setValue] = useState<Promotion | null>(null);
  useEffect(() => {
    if (isDisabled) {
      setValue(null);
    }

    if (data && data.items && data.items.length) {
      const dateAllow = data.items.filter(
        (item) => new Date(item.dateExpire) > new Date() && item.quantity > 0,
      );
      if (dateAllow && dateAllow.length) {
        if (!bills?.items || bills.items.length === 0) {
          setPromotions(dateAllow);
        }

        if (bills && bills.items && bills.items.length) {
          const usedPromotionIds = bills.items.map((bill) => bill.promotion?._id);
          const availablePromotions = dateAllow.filter(
            (item) => !usedPromotionIds.includes(item._id),
          );
          setPromotions(availablePromotions);
        }
      } else {
        setPromotions(undefined);
      }
    }
  }, [bills, data, isDisabled]);
  return (
    <Autocomplete
      disabled={isDisabled}
      fullWidth
      value={value}
      options={promotions ? promotions : []}
      getOptionLabel={(option) => option.couponCode}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue) {
          getValue(newValue);
        }
      }}
      renderOption={(props, option) => (
        <Paper
          component="li"
          {...props}
          sx={{
            borderRadius: 0,
            m: 2,
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Box sx={{ marginRight: 2 }}>
            <Typography
              variant="caption"
              color="black"
              fontWeight="bold"
            >
              {option.couponCode}
            </Typography>
            <Loyalty />
          </Box>
          <Grid container>
            {option.type === PromotionType.Percent && (
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="caption"
                  color="black"
                >
                  {option.percentDiscount}% off
                </Typography>
              </Grid>
            )}
            {option.type === PromotionType.Number && (
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="caption"
                  color="black"
                >
                  Discount
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    option.numberDiscountByNumber ? option.numberDiscountByNumber : 0,
                  )}
                </Typography>
              </Grid>
            )}
            <Grid
              item
              xs={12}
            >
              <Typography
                variant="caption"
                color="black"
              >
                Minimum Order{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(option.priceMinimumApply)}
              </Typography>
            </Grid>
            {option.type === PromotionType.Percent && (
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="caption"
                  color="black"
                >
                  Maximum discount{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    option.priceMaximumByPercent ? option.priceMaximumByPercent : 0,
                  )}
                </Typography>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              my={1}
            >
              <Typography
                color="GrayText"
                variant="caption"
              >
                HSD: {new Date(option.dateExpire).toLocaleDateString()}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          size="small"
          placeholder="Code Voucher"
          color="secondary"
          sx={{
            "& .MuiOutlinedInput-input": {
              color: `${secondary[400]}`,
            },
          }}
          //   onKeyDown={handleKeyDown} // Add the onKeyDown handler
        />
      )}
    />
  );
}
