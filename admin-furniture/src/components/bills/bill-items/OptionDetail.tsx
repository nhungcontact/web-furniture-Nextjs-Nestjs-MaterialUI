import { GetOptionValue } from "@/types/option-value";
import { Typography } from "@mui/material";
type Props = {
  item: GetOptionValue;
};
export default function OptionDetail({ item }: Props) {
  return (
    <Typography
      variant="body1"
      noWrap
      display={"inline-flex"}
      color="grey"
    >
      {item?.name}
    </Typography>
  );
}
