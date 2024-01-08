/* eslint-disable max-lines */
import { ProductSkuCreateInput } from "@/types/product-sku";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import UploadFile from "../product-detail/create/UploadFile";
import VariantDetail from "../product-detail/create/VariantDetail";

type Props = {
  item: ProductSkuCreateInput;
  index: number;
  handleDetailChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    val: number,
  ) => void;
  handleFileRemove: (i: number, index: number) => void;
};
export default function FormDetail({
  handleDetailChange,
  item,
  index,
  handleFileRemove,
}: Props) {
  console.log(item.optionValues);
  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{ background: "#F8F8F8", p: 2 }}
      >
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="primary.dark"
          >
            Variant {index + 1}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          {!!item.optionValues &&
            !!item.optionValues.length &&
            item.optionValues.map((item1) => (
              <VariantDetail
                key={item1}
                val={item1}
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
            fontWeight={"600"}
            color="black"
            mb={1}
            sx={{ display: "inline-flex" }}
          >
            Price
          </Typography>
          <Typography
            color="red"
            sx={{ display: "inline-flex" }}
          >
            *
          </Typography>
          <TextField
            fullWidth
            value={item.price}
            name="price"
            placeholder="Enter a price"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: <InputAdornment position="start">VND</InputAdornment>,
            }}
            onChange={(e) => handleDetailChange(e, index)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
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
            color="black"
          >
            Discount
          </Typography>
          <TextField
            fullWidth
            value={item.priceDiscount}
            name="priceDiscount"
            placeholder="Enter a price discount"
            type="number"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: <InputAdornment position="start">VND</InputAdornment>,
            }}
            onChange={(e) => handleDetailChange(e, index)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
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
            color="black"
          >
            Percent
          </Typography>
          <TextField
            fullWidth
            value={item.percent}
            name="percent"
            placeholder="Enter a percent"
            type="number"
            InputProps={{
              inputProps: { min: 0, max: 100 },
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            onChange={(e) => handleDetailChange(e, index)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            color="black"
            mb={1}
            sx={{ display: "inline-flex" }}
          >
            Quantity In Stock
          </Typography>
          <Typography
            color="red"
            sx={{ display: "inline-flex" }}
          >
            *
          </Typography>
          <TextField
            fullWidth
            value={item.quantityInStock}
            name="quantityInStock"
            placeholder="Enter a quantity"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(e) => handleDetailChange(e, index)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          mb={2}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            color="black"
            mb={1}
            sx={{ display: "inline-flex" }}
          >
            Content
          </Typography>
          <Typography
            color="red"
            sx={{ display: "inline-flex" }}
          >
            *
          </Typography>
          <TextField
            fullWidth
            value={item.content}
            name="content"
            multiline
            rows={4}
            placeholder="Enter a content"
            onChange={(e) => handleDetailChange(e, index)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FFFFFF",
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ marginTop: 4.8, marginBottom: 3 }}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            color="black"
            mb={1}
            sx={{ display: "inline-flex" }}
          >
            Photo
          </Typography>
          <Typography
            color="red"
            sx={{ display: "inline-flex" }}
          >
            *
          </Typography>
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
