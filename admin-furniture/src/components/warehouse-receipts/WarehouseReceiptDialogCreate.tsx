/* eslint-disable max-lines */
import useProductSkuList from "@/hooks/product-skus/useProductSkuList";
import useUserInfor from "@/hooks/users/useUserInfor";
import useWarehouseReceiptAddWRD from "@/hooks/warehouse-receipts/useWarehouseReceiptAddWRD";
import useWarehouseReceiptCreate from "@/hooks/warehouse-receipts/useWarehouseReceiptCreate";
import { GetProductSku } from "@/types/product-sku";
import {
  GetWarehouseReceipt,
  WarehouseReceiptCreateInput,
  WarehouseReceiptUpdateInput,
} from "@/types/warehouse-receipt";
import { WarehouseReceiptDetailCreateInput } from "@/types/warehouse-receipt-detail";
import { jsonForm } from "@/utils/form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AutocompleteProduct from "./AutocompleteProduct";
import AutocompleteProductSku from "./AutocompleteProductSku";
import AutocompleteProvider from "./AutocompleteProvider";
import ProductWarehouseReceiptTable from "./product-table/ProductWarehouseTable";
type Props = {
  handleClose: () => void;
  open: boolean;
  title?: string;
  data?: GetWarehouseReceipt;
};
// const initialWRDetail = {
//   productSku: "",
//   price: 0,
//   quantity: 0,
// };
export default function WarehouseReceiptFormCreate({
  data,
  handleClose,
  title,
  open,
}: Props) {
  const { data: user } = useUserInfor();
  const [listPS, setListPS] = useState<GetProductSku[]>();
  const [product, setProduct] = useState<string>();
  const [wRDetail, setWRDetail] = useState<WarehouseReceiptDetailCreateInput[]>(
    data ? data.warehouseReceiptDetails : [],
  );
  const [productSku, setProductSku] = useState<GetProductSku[]>();
  const { trigger: addWRD } = useWarehouseReceiptAddWRD();
  const { trigger: createWR } = useWarehouseReceiptCreate();
  const handleCreateWR = (event: FormEvent<HTMLFormElement>) => {
    console.log("hi");
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    console.log(json);
    console.log(wRDetail);

    if (wRDetail && wRDetail.length && user) {
      let total = 0;
      for (const val of wRDetail) {
        total += val.price * val.quantity;
      }
      createWR({
        body: {
          user: user._id,
          provider: json.provider,
          totalPrice: total,
          note: json.note,
          warehouseReceiptDetails: [],
        } as WarehouseReceiptCreateInput,
      })
        .then((res) => {
          console.log(res);

          if (res) {
            addWRD({
              body: {
                warehouseReceiptDetails: wRDetail,
                id: res._id,
              } as WarehouseReceiptUpdateInput,
            })
              .then(() => {
                console.log("OK");
              })
              .catch((e) => {
                console.log(e?.message);
              });
          }
        })
        .catch((e) => {
          console.log(e?.message);
        });
    }
  };
  const { data: productSkus } = useProductSkuList({
    product: product ? product : "",
  });

  const handleGetProduct = (val: string) => {
    setProduct(val);
  };
  const handleGetProductSku = (val: GetProductSku) => {
    if (val) {
      if (productSku) {
        const data = [...productSku];
        if (productSku.length > 0) {
          const isDup = productSku.some((item) => item.numberSKU === val.numberSKU);
          if (!isDup) {
            console.log("val", val);
            data.push(val);
            setProductSku(data);

            setWRDetail((prevWRDetail) => [
              ...prevWRDetail,
              {
                price: 0,
                quantity: 0,
                productSku: val._id, // Assuming val._id is the correct property for productSku ID
              },
            ]);
          }
        } else {
          data.push(val);
          console.log("val", val);
          setProductSku(data);
          setWRDetail((prevWRDetail) => [
            ...prevWRDetail,
            {
              price: 0,
              quantity: 0,
              productSku: val._id, // Assuming val._id is the correct property for productSku ID
            },
          ]);
        }
      } else {
        setProductSku([val]);
        setWRDetail((prevWRDetail) => [
          ...prevWRDetail,
          {
            price: 0,
            quantity: 0,
            productSku: val._id, // Assuming val._id is the correct property for productSku ID
          },
        ]);
      }
    }
  };
  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const target = e.target as HTMLInputElement;
    const updatedData = [...wRDetail];
    updatedData[index] = {
      ...updatedData[index],
      [target.name]: target.value,
    };
    setWRDetail(updatedData);
  };

  const handleRemove = (index: number) => {
    if (productSku && listPS) {
      const data = productSku.filter((_, val) => val !== index);
      const wr = wRDetail.filter((_, val) => val !== index);
      setProductSku(data);
      setListPS([...listPS, data[0]]);
      setWRDetail(wr);
    }
  };
  useEffect(() => {
    if (productSkus && productSkus.items && productSkus.items.length) {
      setListPS(productSkus.items);
    }
  }, [productSkus]);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        scroll="paper"
      >
        <DialogTitle>
          <b>{data ? "Update" : "Create"} Warehouse Receipt</b>
          {title && <DialogContentText mb={3}>{title}</DialogContentText>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <form
            onSubmit={handleCreateWR}
            id="create-wr"
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
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Order Preparer
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  fullWidth
                  id="name"
                  value={user?.email}
                  defaultValue={data?.user.email}
                  name="user"
                  type="text"
                  variant="outlined"
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
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Provider
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteProvider />
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
                  marginBottom={1}
                >
                  Note
                </Typography>

                <TextField
                  fullWidth
                  id="name"
                  name="note"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={4}
                  defaultValue={data?.note}
                  placeholder="Enter a notes"
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
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Product
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <AutocompleteProduct handleGetProduct={handleGetProduct} />
              </Grid>
              {!!product && !!listPS && !!listPS.length && (
                <Grid
                  item
                  xs={12}
                  mb={3}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"600"}
                    color="black"
                    marginBottom={1}
                    sx={{ display: "inline-flex" }}
                  >
                    Product Sku
                  </Typography>
                  <Typography
                    color="red"
                    sx={{ display: "inline-flex" }}
                  >
                    *
                  </Typography>
                  <AutocompleteProductSku
                    handleGetProductSku={handleGetProductSku}
                    listPS={listPS}
                  />
                </Grid>
              )}
              {!!productSku && !!productSku.length && (
                <Grid
                  item
                  xs={12}
                  mb={2}
                >
                  <ProductWarehouseReceiptTable
                    productSku={productSku}
                    handleRemove={handleRemove}
                    handleDetailChange={handleDetailChange}
                    // data={data?.warehouseReceiptDetails}
                  />
                </Grid>
              )}
              {!!data &&
                !!data.warehouseReceiptDetails &&
                !!data.warehouseReceiptDetails.length && (
                  <Grid
                    item
                    xs={12}
                  >
                    <ProductWarehouseReceiptTable
                      // productSku={productSku}
                      handleRemove={handleRemove}
                      handleDetailChange={handleDetailChange}
                      data={data?.warehouseReceiptDetails}
                    />
                  </Grid>
                )}
            </Grid>
          </form>
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
            type="submit"
            color="primary"
            form="create-wr"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
