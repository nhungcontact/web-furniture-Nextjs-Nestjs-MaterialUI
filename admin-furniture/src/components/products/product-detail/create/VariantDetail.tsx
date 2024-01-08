import useOptionValueDetail from "@/hooks/option-values/useOptionValueDetail";
import { Typography } from "@mui/material";

type Props = {
  //   val: SkuValueCreateInput;
  val: string;
};
export default function VariantDetail({ val }: Props) {
  const { data: detail } = useOptionValueDetail(val);
  return (
    <>
      <Typography
        variant="body1"
        marginBottom={1}
      >
        <b>{detail?.optionSku.name}</b>: {detail?.name}
      </Typography>
    </>
  );
}
