import useProductList from "@/hooks/products/useProductList";
import { GetProduct, Product } from "@/types/product";
import { ListOptions } from "@/types/shared";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useState } from "react";
import SelectionFilterProduct from "./SelectionFilterProduct";
type Props = {
  handleGetProduct: (val: string) => void;
};
export default function AutocompleteProvider({ handleGetProduct }: Props) {
  const [value, setValue] = useState<GetProduct | null>(null);
  const [options, setOptions] = useState<ListOptions<Product>>({});
  const { data } = useProductList(options);

  const getCat = (v: string) => {
    setOptions({
      ...options,
      category: v,
    });
  };
  console.log(data);
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid
        item
        xs={2}
      >
        <SelectionFilterProduct getCat={getCat} />
      </Grid>

      <Grid
        item
        xs={10}
      >
        <Autocomplete
          fullWidth
          value={value}
          disablePortal
          id="combo-box-demo"
          options={data && data.items ? data.items : []}
          onChange={(event, newValue) => {
            handleGetProduct(newValue?._id as string);
            setValue(newValue as GetProduct);
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#FFFFFF",
                  borderRadius: 0,
                  height: "50px",
                },
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}
