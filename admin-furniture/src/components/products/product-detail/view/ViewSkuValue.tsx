import { GetOptionValue } from "@/types/option-value";
import { Typography } from "@mui/material";
type Props = {
  item: GetOptionValue;
};
export default function ViewSkuValue({ item }: Props) {
  return (
    <Typography
      variant="body1"
      mb={2}
      noWrap
    >
      {item.optionSku.name ?? "-"}: {item.name ?? "-"}
    </Typography>
  );
}
