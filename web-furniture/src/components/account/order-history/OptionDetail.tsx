import useOptionValueDetail from "@/hooks/option-values/useOptionValueDetail";
import { GetOptionValue } from "@/types/option-value";
import { Typography } from "@mui/material";

type Props = {
  data: GetOptionValue;
};
export default function OptionDetail({ data }: Props) {
  return (
    <>
      {!!data && !!data._id && (
        <Typography
          variant="body2"
          display={"inline-flex"}
          // fontWeight={"bold"}
        >
          <b>{data.name ?? "-"}</b>
        </Typography>
      )}
    </>
  );
}
