/* eslint-disable max-lines */
import { ProductSkuCreateInput } from "@/types/product-sku";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import UploadFile from "./UploadFile";
import VariantDetail from "./VariantDetail";
type Props = {
  item: ProductSkuCreateInput;
  index: number;
  handleRemoveDetail: (val: number) => void;
  handleDetailChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    val: number,
  ) => void;
  handleFileRemove: (i: number, index: number) => void;
};
export default function VariantCreate({
  item,
  handleRemoveDetail,
  index,
  handleDetailChange,
  handleFileRemove,
}: Props) {
  console.log("item", item);
  return (
    <>
      <Box textAlign="end">
        <Button
          size="small"
          variant="contained"
          onClick={() => handleRemoveDetail(index)}
        >
          Remove
        </Button>
      </Box>
      <Grid container>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              fontWeight="bold"
              variant="body1"
            >
              Variant detail
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            columnSpacing={2}
          >
            <Grid
              item
              xs={12}
              mb={4}
            >
              {item &&
                item.skuValues &&
                item.skuValues.length > 0 &&
                item.skuValues.map((val, i) => (
                  <VariantDetail
                    key={i}
                    val={val}
                  />
                ))}
            </Grid>
            <Grid
              item
              xs={5}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"bold"}
                marginBottom={1}
              >
                Price
              </Typography>
              <TextField
                fullWidth
                value={item.price}
                name="price"
                placeholder="Enter a price"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => handleDetailChange(e, index)}
              />
            </Grid>
            <Grid
              item
              xs={5}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"bold"}
                marginBottom={1}
              >
                Price Discount
              </Typography>
              <TextField
                fullWidth
                value={item.priceDiscount}
                name="priceDiscount"
                placeholder="Enter a price discount"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => handleDetailChange(e, index)}
              />
            </Grid>
            <Grid
              item
              xs={2}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"bold"}
                marginBottom={1}
              >
                Percent
              </Typography>
              <TextField
                fullWidth
                value={item.percent}
                name="percent"
                placeholder="Enter a percent"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                onChange={(e) => handleDetailChange(e, index)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography
            variant="body1"
            fontWeight={"bold"}
            marginBottom={1}
          >
            Quantity in stock
          </Typography>
          <TextField
            fullWidth
            value={item.quantityInStock}
            name="quantityInStock"
            placeholder="Enter a quantity"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => handleDetailChange(e, index)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography
            variant="body1"
            fontWeight={"bold"}
            marginBottom={1}
          >
            Content
          </Typography>
          <TextField
            fullWidth
            value={item.content}
            name="content"
            multiline
            rows={4}
            placeholder="Enter a content"
            onChange={(e) => handleDetailChange(e, index)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: 4.8, marginBottom: 3 }}
        >
          <UploadFile
            index={index}
            handleDetailChange={handleDetailChange}
            handleFileRemove={handleFileRemove}
            item={item}
          />
        </Grid>
      </Grid>
    </>
  );
}
