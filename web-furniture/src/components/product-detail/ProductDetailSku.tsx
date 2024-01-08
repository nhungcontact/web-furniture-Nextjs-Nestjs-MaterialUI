import { GetProductSku } from "@/types/product-sku";
import { SkuValueCreateInput } from "@/types/sku-value";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  item: GetProductSku[];
  skuValueOption: SkuValueCreateInput[];
  getProductSku: (value: GetProductSku) => void;
  lengthSku: number;
};
export default function ProductDetailSku({
  item,
  skuValueOption,
  getProductSku,
  lengthSku,
}: Props) {
  const [sku, setSku] = useState<GetProductSku | null>(null);
  useEffect(() => {
    if (skuValueOption && skuValueOption.length > 0) {
      for (const sku of item) {
        if (sku.optionValues && sku.optionValues.length > 0 && lengthSku > 0) {
          const r = sku.optionValues.filter((elem) =>
            skuValueOption.find(({ optionValue }) => elem._id === optionValue),
          );
          if (r.length === lengthSku) {
            setSku(sku);
            getProductSku(sku);
            break;
          }
        } else {
          setSku(null);
        }
      }
    }
  }, [getProductSku, item, lengthSku, skuValueOption]);

  return (
    <>
      <Box marginY={2}>
        {/* <Typography
          color={"error.dark"}
          variant="h4"
        >
          {item?.percent ? "Sale off" + " " + item.percent + "%" : ""}
        </Typography> */}
        {sku ? (
          <Typography
            variant="body2"
            color="primary"
          >
            ${sku.priceDiscount ? sku.priceDiscount : sku.price}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color="primary"
          >
            $
            {Math.min(
              ...item?.map((val) => (val.priceDiscount ? val.priceDiscount : val.price)),
            ) ?? "-"}{" "}
            - $
            {Math.max(
              ...item?.map((val) => (val.priceDiscount ? val.priceDiscount : val.price)),
            ) ?? "-"}
          </Typography>
        )}

        {/* {data && data.productSkus.length > 1 && (
                  <Typography variant='h4' color={"error.dark"} marginRight={2} display={"inline"}>
                   ${!data.productSkus[0].percent && Math.min(...data?.productSkus.map(item => item.price as number))} - {!data.productSkus[0].percent && Math.min(...data?.productSkus.map(item => item.price as number))}
                  </Typography>
                )}
                {data && data.productSkus.length > 1 && (
                  <Typography variant='h4' sx={{textDecorationLine:"line-through"}} display={"inline"}>
                   ${data.productSkus[0].percent && Math.min(...data?.productSkus.map(item => item.priceDiscount as number))} - {data.productSkus[0].percent && Math.min(...data?.productSkus.map(item => item.priceDiscount as number))}
                  </Typography>
                )}
                {data && data.productSkus.length === 1  && (
                  <Typography variant='h4' color={"error.dark"} marginRight={2} display={"inline"}>
                   ${data?.productSkus[0]?.percent && data.productSkus[0]?.priceDiscount}
                  </Typography>
                )}
                {data && data.productSkus.length === 1  && (
                  <Typography variant='h4' sx={{textDecorationLine:"line-through"}} display={"inline"}>
                   ${data?.productSkus[0]?.percent && data.productSkus[0]?.price}
                  </Typography>
                )} */}
        <Typography
          variant="caption"
          component={"div"}
          marginTop={1}
        >
          Free shipping
        </Typography>
      </Box>
    </>
  );
}
