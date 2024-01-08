import useOptionNullDetail from "@/hooks/sku-values/useOptionNullDetail";
import { GetOptionNull } from "@/types/option";
import { SkuValue } from "@/types/sku-value";
import { Grid, LinearProgress, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import BasicButton from "../shared/BasicButton";
import RadioColor from "../shared/RadioColor";
type Props = {
  item: GetOptionNull;
  index: number;
  skuValue: SkuValue;
  getValueText: (skuValue: SkuValue, index: number) => void;
};
export default function CartTableBodyTypeDetail({
  item,
  index,
  skuValue,
  getValueText,
}: Props) {
  const [value, setValue] = useState(skuValue ? skuValue.optionValue : "");
  const { data: detailOptionNull, isLoading } = useOptionNullDetail(item._id);
  const controlValueProps = (id: string, name: string) => ({
    checked: value === id,
    onChange: handleChangeValue,
    value: id,
    inputProps: { "aria-label": name },
  });

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    getValueText(
      {
        ...skuValue,
        optionSku:
          detailOptionNull && detailOptionNull.optionSku
            ? detailOptionNull.optionSku._id
            : "",
        optionValue: (event.target as HTMLInputElement).value,
      },
      index,
    );
  };
  return (
    <Grid
      item
      xs={12}
    >
      {isLoading && <LinearProgress />}
      {detailOptionNull && (
        <Grid
          container
          mb={2}
        >
          <Grid
            item
            xs={2}
            textAlign="start"
          >
            <Typography
              variant="caption"
              fontWeight="bold"
            >
              {detailOptionNull.optionSku.name}:
            </Typography>
          </Grid>
          {detailOptionNull.optionValues &&
            detailOptionNull.optionValues.map((item) => (
              <Grid
                item
                xs={Math.ceil(10 / detailOptionNull.optionValues.length)}
                key={item._id}
                textAlign={"start"}
              >
                <RadioColor
                  {...controlValueProps(item._id, item.name)}
                  icon={
                    <BasicButton
                      variant="outlined"
                      color="secondary"
                    >
                      {item.name}
                    </BasicButton>
                  }
                  checkedIcon={
                    <BasicButton
                      variant="contained"
                      color="secondary"
                    >
                      {item.name}
                    </BasicButton>
                  }
                  sx={{
                    padding: "0px 5px 0px 5px",
                    "& .MuiSvgIcon-root": {
                      fontSize: "34px",
                    },
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Grid>
  );
}
