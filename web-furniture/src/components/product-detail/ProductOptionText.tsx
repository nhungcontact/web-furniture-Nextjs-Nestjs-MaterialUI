import { MergeValues } from "@/utils/merge-option-value";
import { Box, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import BasicButton from "../shared/BasicButton";
import RadioColor from "../shared/RadioColor";

type Props = {
  item: MergeValues;
  getValue: (val: string, index: number) => void;
  index: number;
};
export default function ProductOptionText({ item, index, getValue }: Props) {
  const [size, setSize] = useState("");
  const [sizeName, setSizeName] = useState("");

  const handleChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    setSize((event.target as HTMLInputElement).value);
    setSizeName((event.target as HTMLInputElement).ariaLabel as string);
    getValue((event.target as HTMLInputElement).value, index);
  };

  const controlSizeProps = (id: string, name: string) => ({
    checked: size === id,
    onChange: handleChangeSize,
    value: id,
    inputProps: { "aria-label": name },
  });
  return (
    <Box marginTop={2}>
      <Typography
        variant="caption"
        fontWeight={600}
        display={"inline"}
        marginRight={1}
      >
        Select {item.optionSku && item.optionSku.name}:{" "}
      </Typography>
      <Typography
        variant="body1"
        display={"inline"}
      >
        {sizeName}
      </Typography>
      <Box marginTop={1}>
        {item &&
          item.optionValues &&
          item.optionValues.map((val, i) => (
            <RadioColor
              key={i}
              {...controlSizeProps(val._id, val.name)}
              icon={
                <BasicButton
                  variant="outlined"
                  color="secondary"
                >
                  {val.name}
                </BasicButton>
              }
              checkedIcon={
                <BasicButton
                  variant="contained"
                  color="secondary"
                >
                  {val.name}
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
          ))}
      </Box>
    </Box>
  );
}
