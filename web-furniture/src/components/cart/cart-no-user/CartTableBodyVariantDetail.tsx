import BasicButton from "@/components/shared/BasicButton";
import RadioColor from "@/components/shared/RadioColor";
import { GetOptionValue } from "@/types/option-value";
import { MergeValues } from "@/utils/merge-option-value";
import { Grid, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  item: MergeValues;
  index: number;
  getValueText: (value: string, index: number) => void;
  data: GetOptionValue[];
};
export default function CartTableBodyVariantDetail({
  item,
  index,
  data,
  getValueText,
}: //   skuValue,
//   getValueText,
Props) {
  const [value, setValue] = useState("");
  const controlValueProps = (id: string, name: string) => ({
    checked: value === id,
    onChange: handleChangeValue,
    value: id,
    inputProps: { "aria-label": name },
  });

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    getValueText((event.target as HTMLInputElement).value, index);
  };
  useEffect(() => {
    if (data) {
      for (const val of data) {
        const update = item.optionValues.filter((item) => item._id === val._id);
        if (update && update.length) {
          setValue(update[0]._id);
        }
      }
    }
  }, [data, item.optionValues]);
  return (
    <Grid
      item
      xs={12}
    >
      <Grid
        container
        mb={2}
      >
        <Grid
          item
          xs={12}
          textAlign="start"
          mb={1}
        >
          <Typography
            variant="caption"
            fontWeight="bold"
          >
            {item.optionSku.name}:
          </Typography>
        </Grid>
        {item.optionValues &&
          item.optionValues.map((item1) => (
            <Grid
              item
              xs={Math.ceil(12 / item.optionValues.length)}
              key={item1._id}
              textAlign={"start"}
              mb={2}
            >
              <RadioColor
                {...controlValueProps(item1._id, item1.name)}
                icon={
                  <BasicButton
                    variant="outlined"
                    color="secondary"
                  >
                    {item1.name}
                  </BasicButton>
                }
                checkedIcon={
                  <BasicButton
                    variant="contained"
                    color="secondary"
                  >
                    {item1.name}
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
    </Grid>
  );
}
