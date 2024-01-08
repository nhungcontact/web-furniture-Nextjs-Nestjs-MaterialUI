import useProductDetail from "@/hooks/products/useProductDetail";
import { GetProductSku } from "@/types/product-sku";
import { SkuValue } from "@/types/sku-value";
import { useState } from "react";
import CartTableBodyTypeDetail from "./CartTableBodyTypeDetail";
import { Product } from "@/types/product";
import { Container, Grid } from "@mui/material";
type Props = {
  item: GetProductSku;
  skuValues: SkuValue[];
  handleGetProductSku: (value: SkuValue[], index: number, item: GetProductSku) => void;
  i: number;
};

export default function CartTableBodyType({
  item,
  skuValues,
  handleGetProductSku,
  i,
}: Props) {
  const { data: productDetail } = useProductDetail((item.product as Product)._id);

  const [dataSkuValues, setDataSkuValues] = useState<SkuValue[]>(skuValues);
  //   const [cartItem, setCartItem] = useState<CartItem>({} as CartItem);
  const handleGetValueText = (skuValue: SkuValue, index: number) => {
    const updateValue = [...dataSkuValues];
    updateValue[index] = skuValue;
    setDataSkuValues(updateValue);
    handleGetProductSku(updateValue, i, item);
  };
  //   const { data: skuValueDetail } = useSkuValueDetail(item._id);

  return (
    <Grid container>
      {productDetail &&
        productDetail.skuValues &&
        productDetail.skuValues.map((val, i) => (
          <CartTableBodyTypeDetail
            item={val}
            index={i}
            key={val._id}
            skuValue={skuValues[i]}
            getValueText={handleGetValueText}
          />
        ))}
    </Grid>
  );
}
