/* eslint-disable max-lines */
import { GetProductSku } from "@/types/product-sku";
import { WarehouseReceiptDetail } from "@/types/warehouse-receipt-detail";
import { DeleteOutline } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent } from "react";

type Props = {
  productSku?: GetProductSku[];
  handleRemove: (index: number) => void;
  handleDetailChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    val: number,
  ) => void;
  data?: WarehouseReceiptDetail[];
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F2EBFF",
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    textTransform: "capital",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ProductWarehouseReceiptTable({
  productSku,
  handleRemove,
  handleDetailChange,
  data,
}: Props) {
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 0 }}
      >
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>#SKU</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!data &&
              !!data.length &&
              data.map((row, i) => (
                <TableRow
                  key={(row.productSku as GetProductSku)._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography
                      fontWeight={"bold"}
                      color="black"
                      variant="body1"
                    >
                      #{(row.productSku as GetProductSku).numberSKU}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Grid
                      container
                      spacing={3}
                      m={1}
                    >
                      <Grid
                        item
                        xs={3}
                      >
                        <Image
                          src={
                            (row.productSku as GetProductSku).photos[0].imageURL ?? "/"
                          }
                          alt={(row.productSku as GetProductSku).photos[0].name ?? "/"}
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
                          {(row.productSku as GetProductSku)?.product.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="black"
                        >
                          Price:{" "}
                          <b>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            }).format(row.price) ?? "="}
                          </b>
                        </Typography>
                        {!!(row.productSku as GetProductSku).priceDiscount && (
                          <Typography
                            variant="body1"
                            color="black"
                          >
                            Price discount:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            }).format(
                              (row.productSku as GetProductSku).priceDiscount ?? 0,
                            )}{" "}
                            ({(row.productSku as GetProductSku).percent}%)
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          color="black"
                        >
                          Quanity in stock: x{" "}
                          <b>{(row.productSku as GetProductSku).quantityInStock}</b>
                        </Typography>
                        {!!(row.productSku as GetProductSku).optionValues &&
                          !!(row.productSku as GetProductSku).optionValues.length &&
                          (row.productSku as GetProductSku).optionValues.map(
                            (item, index) => (
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
                                {index !==
                                  (row.productSku as GetProductSku).optionValues.length -
                                    1 && ", "}
                              </>
                            ),
                          )}
                      </Grid>
                    </Grid>
                  </TableCell>

                  <TableCell align="right">
                    <TextField
                      fullWidth
                      sx={{
                        // width: "150px",
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                          height: "44px",
                        },
                      }}
                      type="number"
                      name="price"
                      defaultValue={row.price ? row.price : 0}
                      InputProps={{ inputProps: { min: 1 } }}
                      onChange={(e) => handleDetailChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      fullWidth
                      sx={{
                        // width: "150px",
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                          height: "44px",
                        },
                      }}
                      type="number"
                      name="quantity"
                      defaultValue={row.quantity ? row.quantity : 0}
                      InputProps={{ inputProps: { min: 1 } }}
                      onChange={(e) => handleDetailChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleRemove(i)}>
                      <DeleteOutline color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {!!productSku &&
              !!productSku.length &&
              productSku.map((row, i) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography
                      fontWeight={"bold"}
                      color="black"
                      variant="body1"
                    >
                      #{row.numberSKU}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Grid
                      container
                      spacing={3}
                      m={1}
                    >
                      <Grid
                        item
                        xs={3}
                      >
                        <Image
                          src={row.photos[0].imageURL ?? "/"}
                          alt={row.photos[0].name ?? "/"}
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
                          {row?.product.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="black"
                        >
                          Price:{" "}
                          <b>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            }).format(row.price) ?? "="}
                          </b>
                        </Typography>
                        {!!row.priceDiscount && (
                          <Typography
                            variant="body1"
                            color="black"
                          >
                            Price discount:{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "vnd",
                            }).format(row.priceDiscount) ?? "="}{" "}
                            ({row.percent}%)
                          </Typography>
                        )}
                        <Typography
                          variant="body1"
                          color="black"
                        >
                          Quanity in stock: x <b>{row.quantityInStock}</b>
                        </Typography>
                        {!!row.optionValues &&
                          !!row.optionValues.length &&
                          row.optionValues.map((item, index) => (
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
                                      marginRight: "10px",
                                      marginLeft: "10px",
                                    }}
                                  />
                                )}
                                <b>{item.name}</b>
                              </Typography>
                              {index !== row.optionValues.length - 1 && ", "}
                            </>
                          ))}
                      </Grid>
                    </Grid>
                  </TableCell>

                  <TableCell align="right">
                    <TextField
                      sx={{
                        width: "100px",
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                          height: "44px",
                        },
                      }}
                      type="number"
                      name="price"
                      defaultValue={0}
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={(e) => handleDetailChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      sx={{
                        width: "100px",
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                          height: "44px",
                        },
                      }}
                      type="number"
                      name="quantity"
                      defaultValue={0}
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={(e) => handleDetailChange(e, i)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleRemove(i)}>
                      <DeleteOutline color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
