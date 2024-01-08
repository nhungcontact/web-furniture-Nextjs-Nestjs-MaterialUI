import useProductSkuRemove from "@/hooks/product-skus/useProductSkuRemove";
import { GetProductSku } from "@/types/product-sku";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import ProductDetailDialogUpdate from "../edit/ProductDetailDialogUpdate";
import ViewSkuValue from "./ViewSkuValue";
type Props = {
  data: GetProductSku;
  index: number;
};

export default function ProductDetailTableBody({ data, index }: Props) {
  const [open, toggleOpen] = useState(false);
  const { trigger: removePS } = useProductSkuRemove(data._id);

  const handleClose = () => {
    toggleOpen(false);
  };

  const handleUpdate = () => {
    toggleOpen(true);
  };

  const handleRemove = () => {
    removePS()
      .then(() => {
        alert("OK");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <TableRow
      hover
      sx={{
        "&:last-of-type td, &:last-of-type th": {
          border: 0,
        },
      }}
    >
      <TableCell>
        <Typography variant="body1">{index + 1}</Typography>
      </TableCell>

      <TableCell>
        <Typography
          variant="body1"
          fontWeight={"bold"}
        >
          #{data.numberSKU ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.price ?? 0)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.priceDiscount ?? 0)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.percent ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.quantitySold ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.quantityInStock ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.content ?? "-"}</Typography>
      </TableCell>

      <TableCell>
        {data &&
          data.optionValues &&
          data.optionValues.map((item, i) => (
            <ViewSkuValue
              key={i}
              item={item}
            />
          ))}
      </TableCell>

      <TableCell
        sx={{
          border: "none",
          position: "sticky",
          bgcolor: "background.default",
          right: 0,
          minWidth: "150px",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={handleUpdate}
            className="btn-table"
            variant="contained"
            sx={{ mr: !data.quantitySold ? 3 : 0 }}
          >
            Update
          </Button>
          {!data.quantitySold && (
            <Button
              onClick={handleRemove}
              className="btn-table"
              variant="contained"
            >
              Remove
            </Button>
          )}
        </Box>
      </TableCell>
      <ProductDetailDialogUpdate
        handleClose={handleClose}
        open={open}
        data={data}
      />
    </TableRow>
  );
}
