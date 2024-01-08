/* eslint-disable max-lines */
import { primary } from "@/config/theme";
import useUserInfor from "@/hooks/users/useUserInfor";
import { BillStatus, GetBill } from "@/types/bill";
import { BillItemCreateInput, GetBillItem } from "@/types/bill-item";
import { GetReview } from "@/types/review";
import { DataSaverOn, RestartAlt, StarOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OptionDetail from "./OptionDetail";
import ReviewOrder from "./ReviewOrder";

type Props = {
  item: BillItemCreateInput | GetBillItem;
  i: number;
  isDetail: boolean;
  bill: GetBill;
};
export default function ProductDetail({ item, i, isDetail, bill }: Props) {
  const router = useRouter();
  const { data: user } = useUserInfor();
  const [review, setReview] = useState<GetReview>();
  const [billItem, setBillItem] = useState<GetBillItem>();
  const [openReview, setOpenReview] = useState<boolean>(false);

  const handleOpenReview = (val: number, name: string) => {
    console.log("name", name, val, i);

    if (i === val && name === "review") {
      setOpenReview(true);
    }
  };

  const handleClose = (val: number, name: string) => {
    if (i === val && name === "review") {
      console.log("name", name);
      setOpenReview(false);
    }
  };

  useEffect(() => {
    if (item) {
      setBillItem(item as GetBillItem);
    }
  }, [item]);

  useEffect(() => {
    if (
      !!item &&
      !!(item as GetBillItem).productSkuId &&
      !!(item as GetBillItem).productSkuId.reviews &&
      !!(item as GetBillItem).productSkuId.reviews?.length &&
      !!user
    ) {
      const data = (item as GetBillItem).productSkuId.reviews?.filter(
        (item) => item.bill._id === bill._id && item.user._id === user._id,
      );
      if (data && data.length) {
        setReview(data[0]);
      }
    }
  }, [bill._id, item, user]);
  //   console.log(productSkuId);
  return (
    <>
      {!!billItem && !!billItem.productSkuId && !!billItem.productSkuId._id && (
        <Box>
          <Box
            display={"flex"}
            justifyContent={"start"}
            p={2}
          >
            <Image
              src={billItem.productSkuId?.photos[0].imageURL ?? "/"}
              alt="photo"
              width={180}
              height={130}
              unoptimized
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            />
            <Box
              textAlign={"start"}
              sx={{ ml: 2 }}
            >
              <Typography
                color="primary"
                variant="h5"
                fontWeight={"bold"}
              >
                {billItem.product.name ?? "-"}
              </Typography>
              {billItem.productSkuId.optionValues &&
                billItem.productSkuId.optionValues.length &&
                billItem.productSkuId.optionValues.map((val, i) => (
                  <>
                    <OptionDetail
                      key={i}
                      data={val}
                    />
                    {i !== billItem.productSkuId.optionValues.length - 1 && " / "}
                  </>
                ))}
              <br />
              <Typography variant="body2">
                Price:{" "}
                <b
                  style={{
                    marginRight: "10px",
                    color: `${!!billItem.productSkuId.priceDiscount ? "red" : "black"}`,
                  }}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(billItem.price) ?? "-"}
                </b>
                {!!billItem.productSkuId.percent && (
                  <b
                    style={{
                      textDecorationLine: "line-through",
                      display: "inline-flex",
                      color: "GrayText",
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(billItem.productSkuId.price) ?? "-"}
                  </b>
                )}
              </Typography>

              <Typography variant="body2">
                Quantity:
                <b> x {billItem.quantity}</b>
              </Typography>
            </Box>
          </Box>
          {!isDetail && (
            <Box
              sx={{ p: 2, mt: 2 }}
              textAlign={"end"}
            >
              <Box mb={1}>
                <Typography display={"inline-flex"}>Total: </Typography>
                <Typography
                  variant="h4"
                  //   color="red"
                  display={"inline-flex"}
                  marginLeft={1}
                >
                  <b>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(billItem.totalPrice) ?? "-"}
                  </b>
                </Typography>
              </Box>
              <Box>
                {bill.status === BillStatus.Success && (
                  <Button
                    variant="outlined"
                    startIcon={<StarOutlineOutlined color="secondary" />}
                    onClick={() => handleOpenReview(i, "review")}
                    sx={{ borderRadius: 0 }}
                  >
                    <Typography
                      textTransform="capitalize"
                      color="black"
                      variant="caption"
                      fontWeight="bold"
                    >
                      {review ? "View review" : "Write a Review"}
                    </Typography>
                  </Button>
                )}
                <Button
                  sx={{ ml: 2, borderRadius: 0, ":hover": { cursor: "pointer" } }}
                  variant="outlined"
                  startIcon={
                    bill.status === BillStatus.Success ? (
                      <RestartAlt color="secondary" />
                    ) : (
                      <DataSaverOn color="secondary" />
                    )
                  }
                  onClick={() =>
                    router.push(
                      `/furniture/product/product-detail/${
                        (item as GetBillItem).productSku.product
                      }`,
                    )
                  }
                >
                  <Typography
                    textTransform="capitalize"
                    color="black"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Buy{" "}
                    {bill.status === BillStatus.Success ||
                    bill.status === BillStatus.Cancel
                      ? "again"
                      : "more"}
                  </Typography>
                </Button>
              </Box>

              {billItem.product && user && (
                <ReviewOrder
                  productSku={billItem.productSkuId}
                  handleClose={handleClose}
                  open={openReview}
                  index={i}
                  product={billItem.product}
                  bill={bill}
                  user={user}
                  review={review}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
