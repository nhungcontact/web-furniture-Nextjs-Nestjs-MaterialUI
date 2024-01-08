import { GetProductSku } from "@/types/product-sku";
import { Autocomplete, Grid, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
type Props = {
  listPS: GetProductSku[];
  handleGetProductSku: (val: GetProductSku) => void;
};
export default function AutocompleteProductSku({ listPS, handleGetProductSku }: Props) {
  //   const [produtcSkus, setProductSkus] = useState<GetProductSku[]>();

  const [value, setValue] = useState<GetProductSku | null>(null);

  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      value={value}
      options={listPS ?? []}
      onChange={(event, newValue) => {
        if (newValue) {
          handleGetProductSku(newValue);
          //   const data = produtcSkus?.filter((item) => item._id !== newValue._id);
          //   setProductSkus(data);
          setValue(null);
        }
      }}
      getOptionLabel={(option) => option.numberSKU}
      renderOption={(props, option) => (
        <Paper
          component="li"
          {...props}
          sx={{
            borderRadius: 0,
            m: 2,
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <Grid
            container
            spacing={2}
            m={1}
          >
            <Grid
              item
              xs={3}
            >
              <Image
                src={option.photos[0].imageURL ?? "/"}
                alt={option.photos[0].name ?? "/"}
                width={100}
                height={100}
                unoptimized
              />
            </Grid>
            <Grid
              item
              xs={8}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="black"
                mb={1}
              >
                {listPS[0].product.name}
              </Typography>
              <Typography variant="body1">
                Price:{" "}
                <b>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(option.price) ?? "="}
                </b>
              </Typography>
              {!!option.priceDiscount && (
                <Typography
                  variant="body1"
                  color="black"
                >
                  Price discount:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(option.priceDiscount) ?? "="}{" "}
                  ({option.percent}%)
                </Typography>
              )}
              <Typography variant="body1">
                Quanity in stock: x <b>{option.quantityInStock}</b>
              </Typography>
              {!!option.optionValues &&
                !!option.optionValues.length &&
                option.optionValues.map((item, index) => (
                  <>
                    <Typography
                      key={item._id}
                      variant="body1"
                      display={"inline-flex"}
                      color="black"
                    >
                      {item.optionSku.name}:
                      {item.optionSku.name === "Color" && (
                        <Image
                          src={item.photo.imageURL ?? "/"}
                          alt={item.photo.name ?? "/"}
                          width={20}
                          height={20}
                          unoptimized
                          style={{
                            borderRadius: "50%",
                            marginRight: 1,
                          }}
                        />
                      )}
                      <b>{item.name}</b>
                    </Typography>
                    {index !== option.optionValues.length - 1 && ", "}
                  </>
                ))}
            </Grid>
          </Grid>
        </Paper>
      )}
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
  );
}
