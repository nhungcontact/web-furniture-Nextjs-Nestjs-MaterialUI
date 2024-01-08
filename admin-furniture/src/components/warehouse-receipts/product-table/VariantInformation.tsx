import useOptionValueDetail from "@/hooks/option-values/useOptionValueDetail";
import { GetSkuValue } from "@/types/sku-value";
import { Typography } from "@mui/material";

type Props = {
  skuValue: GetSkuValue;
};
export default function VariantInformation({ skuValue }: Props) {
  const { data } = useOptionValueDetail(skuValue.optionValue);
  console.log(data);
  return (
    <>
      <Typography>{data?.optionSku.name}</Typography>
    </>
  );
}
