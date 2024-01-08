import useProductDetail from "@/hooks/products/useProductDetail";
import { GetProduct } from "@/types/product";
import { GetProductSku } from "@/types/product-sku";
import { Grid } from "@mui/material";
import { useState } from "react";
import CartTableBodyVariantDetail from "./CartTableBodyVariantDetail";
import mergeOptionValue from "@/utils/merge-option-value";
type Props = {
  item: GetProductSku;
  handleGetProductSku: (
    value: string[],
    index: number,
    item: GetProductSku,
    product: GetProduct,
  ) => void;
  i: number;
};

export default function CartTableBodyVariant({ item, handleGetProductSku, i }: Props) {
  const { data: productDetail } = useProductDetail(item.product._id);
  console.log("productDetail", productDetail);

  const [dataSkuValues, setDataSkuValues] = useState<string[]>(
    item.optionValues.map((item) => item._id),
  );
  //   const [cartItem, setCartItem] = useState<CartItem>({} as CartItem);
  const handleGetValueText = (value: string, index: number) => {
    const updateValue = [...dataSkuValues];
    updateValue[index] = value;
    setDataSkuValues(updateValue);
    if (productDetail) {
      handleGetProductSku(updateValue, i, item, productDetail);
    }
  };

  //   const { data: skuValueDetail } = useSkuValueDetail(item._id);

  return (
    <Grid container>
      {productDetail &&
        mergeOptionValue(productDetail) &&
        mergeOptionValue(productDetail).map((val, i) => (
          <CartTableBodyVariantDetail
            item={val}
            index={i}
            key={i}
            data={item.optionValues}
            getValueText={handleGetValueText}
          />
        ))}
    </Grid>
  );
}
