import { GetProductSku } from "@/types/product-sku";
import { Add, Remove } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
type Props = {
  getQuantity?: (value: number, index: number) => void;
  quantityValue?: number;
  index?: number;
  data: GetProductSku | null;
};
export default function InputQuantity({
  getQuantity,
  quantityValue,
  index,
  data,
}: Props) {
  const [quantity, setQuantity] = useState(quantityValue ? quantityValue : 1);
  const handleIncreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      if (index !== undefined) {
        getQuantity?.(quantity - 1, index);
      }
    }
  };
  const handleDecreaseQuantity = () => {
    console.log(index);
    if (quantity < 10) {
      setQuantity(quantity + 1);
      if (index !== undefined) {
        console.log("OK");
        getQuantity?.(quantity + 1, index);
      }
    }
  };
  const handleChangeQuantity = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && data && value > 0 && value < data.quantityInStock) {
      setQuantity(value);
      if (index !== undefined) {
        getQuantity?.(value, index);
      }
    }
  };
  return (
    <Box sx={{ display: "inline-flex" }}>
      <Button
        sx={{
          borderRadius: "0px",
          minWidth: "50px",
          paddingX: "15px",
          height: "47px",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderLeft: "1px solid",
        }}
        onClick={handleIncreaseQuantity}
      >
        <Remove />
      </Button>
      <TextField
        variant="outlined"
        value={quantity}
        name="quantity"
        onChange={handleChangeQuantity}
        type="number"
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0px",
            border: "1px solid #2B4A41",
          },
          "& .MuiOutlinedInput-input": {
            padding: "11px",
            textAlign: "center",
            "&[type=number]": {
              "-moz-appearance": "textfield",
            },
            "&::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
            "&::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          },
          width: "60px",
          height: "50px",
        }}
      />
      <Button
        sx={{
          borderRadius: "0px",
          minWidth: "50px",
          paddingX: "15px",
          height: "47px",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderRight: "1px solid",
        }}
        onClick={handleDecreaseQuantity}
      >
        <Add />
      </Button>
    </Box>
  );
}
