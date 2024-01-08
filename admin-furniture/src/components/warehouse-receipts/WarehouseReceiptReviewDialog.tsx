/* eslint-disable max-lines */
import { GetProductSku } from "@/types/product-sku";
import { GetWarehouseReceipt } from "@/types/warehouse-receipt";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
type Props = {
  handleClose: () => void;
  open: boolean;
  title?: string;
  data?: GetWarehouseReceipt;
};
export default function WarehouseReceiptRevireDialog({
  data,
  handleClose,
  title,
  open,
}: Props) {
  //   const {trigger: updateStatus}=useWar
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <b>Review Warehouse Receipt</b>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <Grid
            container
            justifyContent="space-between"
            columnSpacing={2}
          >
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary.dark"
              >
                Information
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                color="black"
                mr={1}
                sx={{ display: "inline-flex" }}
              >
                Order Preparer:
              </Typography>
              <Typography sx={{ display: "inline-flex" }}>{data?.user.email}</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                color="black"
                mr={1}
                sx={{ display: "inline-flex" }}
              >
                Provider:
              </Typography>
              <Typography sx={{ display: "inline-flex" }}>
                {data?.provider.email}
              </Typography>
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
                mr={1}
                sx={{ display: "inline-flex" }}
              >
                Note:
              </Typography>
              <Typography sx={{ display: "inline-flex" }}>{data?.note}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              my={2}
            >
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              mb={3}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary.dark"
              >
                Information Product
              </Typography>
            </Grid>

            {!!data &&
              !!data.warehouseReceiptDetails &&
              !!data.warehouseReceiptDetails.length && (
                <Grid
                  item
                  xs={12}
                >
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
                          <TableCell>#SKU</TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.warehouseReceiptDetails.map((row) => (
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
                                      (row.productSku as GetProductSku).photos[0]
                                        .imageURL ?? "/"
                                    }
                                    alt={
                                      (row.productSku as GetProductSku).photos[0].name ??
                                      "/"
                                    }
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
                                    Price:
                                    <b>
                                      {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "vnd",
                                      }).format(
                                        (row.productSku as GetProductSku).price,
                                      ) ?? "="}
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
                                        (row.productSku as GetProductSku).priceDiscount ??
                                          0,
                                      )}
                                      ({(row.productSku as GetProductSku).percent}%)
                                    </Typography>
                                  )}
                                  <Typography
                                    variant="body1"
                                    color="black"
                                  >
                                    Quanity in stock: x{" "}
                                    <b>
                                      {(row.productSku as GetProductSku).quantityInStock}
                                    </b>
                                  </Typography>
                                  {!!(row.productSku as GetProductSku).optionValues &&
                                    !!(row.productSku as GetProductSku).optionValues
                                      .length &&
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
                                            (row.productSku as GetProductSku).optionValues
                                              .length -
                                              1 && ", "}
                                        </>
                                      ),
                                    )}
                                </Grid>
                              </Grid>
                            </TableCell>

                            <TableCell align="right">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "vnd",
                              }).format(row.price ?? 0)}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            size="medium"
            variant="contained"
            onClick={handleClose}
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            className="btn-action"
          >
            Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
