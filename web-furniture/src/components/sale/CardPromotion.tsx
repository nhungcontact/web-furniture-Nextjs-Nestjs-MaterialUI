/* eslint-disable max-lines */
import { Promotion } from "@/types/promotion";
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

type Props = {
  item: Promotion;
  index: number;
};
export default function CardPromotion({ index, item }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("MainPage");

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyCode = (code: string, i: number) => {
    if (i === index && !isCopied) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
      enqueueSnackbar(`${t("Copied Success")} ${code}`, {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };
  return (
    <Grid
      item
      xs={6}
      key={item._id}
    >
      <Paper
        sx={{
          boxShadow: 0,
          p: 3,
          position: "relative",
          ":before": {
            content: `""`,
            position: "absolute",
            left: "calc(70% - 20px)",
            width: "20px",
            height: "10px",
            backgroundColor: "#fff0ec",
            border: "1px solid rgba(0, 0, 0, 0.015)",
            top: "-1px",
            borderBottomLeftRadius: "40px",
            borderBottomRightRadius: "40px",
            borderTop: 0,
          },
          ":after": {
            content: `""`,
            position: "absolute",
            left: "calc(70% - 20px)",
            width: "20px",
            height: "10px",
            backgroundColor: "#fff0ec",
            border: "1px solid rgba(0, 0, 0, 0.015)",
            bottom: "-1px",
            borderTopLeftRadius: "40px",
            borderTopRightRadius: "40px",
            borderBottom: 0,
          },
        }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          rowSpacing={1}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              position: "relative",
              background: "red",
              padding: "12px",
              height: "100%",
              flexDirection: "column",
              borderTop: "1px solid red",
              borderBottom: "1px solid red",
              ":before": {
                left: 0,
                background:
                  "repeating-linear-gradient(#ff0000, #ff0000 4px, #ffffff 0, #ffffff 12px, #ff0000 0, #ff0000 16px) 0px/1px 100% no-repeat, radial-gradient(circle at 0px 8px,#ffffff,#ffffff 4px, #ff0000 0, #ff0000 5px, #ff0000 0) 1px 0/100% 16px repeat-y",
                content: `""`,
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "10px",
              },
              ":after": {
                right: 0,
                background:
                  "repeating-linear-gradient(#ff0000, #ff0000 4px, #ffffff 0, #ffffff 12px, #ff0000 0, #ff0000 16px) 9px/1px 100% no-repeat, radial-gradient(circle at 8px 8px, #ffffff, #ffffff 4px, #ff0000 0, #ff0000 5px, #ff0000 0) 1px 0/100% 16px repeat-y",
                content: `""`,
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "10px",
              },
            }}
          >
            <Typography
              variant="h5"
              textTransform={"uppercase"}
              sx={{
                background: "white",
                textAlign: "center",
                mb: "12px",
                borderRadius: "4px",
                color: "#ff0000",
                padding: "7px 10px",
              }}
            >
              {t("Sale now")}{" "}
              {item.numberDiscountByNumber && (
                <b style={{ fontSize: "28px", marginLeft: "10px" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.numberDiscountByNumber) ?? "-"}
                </b>
              )}
              {item.priceMaximumByPercent && (
                <b style={{ fontSize: "28px", marginLeft: "10px" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.priceMaximumByPercent) ?? "-"}
                </b>
              )}
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                color="white"
                variant="body2"
              >
                {t("Minimum order of")}{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.priceMinimumApply) ?? "-"}
              </Typography>
              <Button
                disabled={isCopied}
                size="small"
                sx={{
                  background: "white",
                  color: "red",
                  borderRadius: "15px",
                  width: "100px",
                  ":hover": {
                    background: "white",
                    color: "red",
                  },
                }}
                onClick={() => handleCopyCode(item.couponCode, index)}
              >
                <Typography
                  variant="button"
                  fontWeight={"bold"}
                >
                  {isCopied ? t("Copied") : t("Copy code")}
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography
                variant="body2"
                sx={{ color: "#787878" }}
              >
                {t("Expiry Date")}:{" "}
                <b style={{ color: "black" }}>
                  {new Date(item.dateExpire).toLocaleString("en-US", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </b>
              </Typography>
              <ErrorOutlineRounded />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
