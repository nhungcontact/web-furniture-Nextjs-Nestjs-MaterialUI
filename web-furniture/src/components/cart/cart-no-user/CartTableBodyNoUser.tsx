/* eslint-disable max-lines */
import InputQuantity from "@/components/shared/InputQuantity";
import useProductSkuDetail from "@/hooks/product-skus/useProductSkuDetail";
import { GetCartItem } from "@/types/cart-item";
import { GetProduct, Product } from "@/types/product";
import { GetProductSku } from "@/types/product-sku";
import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import CartTableBodyVariant from "./CartTableBodyVariant";
type Props = {
  data: GetCartItem;
  onClickSelect: (event: React.MouseEvent<unknown>, id: GetCartItem) => void;
  isItemSelected?: boolean;
  handleGetQuantity: (value: number, index: number) => void;
  index: number;
  handleGetProductSku: (
    value: string[],
    index: number,
    item: GetProductSku,
    product: GetProduct,
  ) => void;
  handleRemove: (val: number) => void;
};
export default function CartTableBodyNoUser({
  data,
  isItemSelected,
  onClickSelect,
  handleGetQuantity,
  index,
  handleGetProductSku,
  handleRemove,
}: //   handleGetProductSku,
Props) {
  const { data: dataProductSku } = useProductSkuDetail(data ? data.productSku._id : "");

  //   const { data: dataCartItem } = useCartItemDetail(data ? (data as GetCartItem)._id : "");

  const handleClick = (event: React.MouseEvent<unknown>, data: GetCartItem) => {
    onClickSelect(event, data);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      {dataProductSku && data && (
        <TableRow
          hover
          sx={{
            "&:last-of-type td, &:last-of-type th": {
              border: 0,
            },
          }}
          tabIndex={-1}
          selected={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              onClick={(event) => handleClick(event, data)}
            />
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            align="center"
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              textAlign={"start"}
            >
              <Image
                alt={"dsads"}
                src={
                  dataProductSku.photos.length > 0
                    ? dataProductSku.photos[0].imageURL
                    : "/"
                }
                width={180}
                height={120}
                unoptimized
              />
              <Typography
                fontWeight={600}
                variant="body2"
                ml={2}
                noWrap
              >
                {dataProductSku.product ? (dataProductSku.product as Product).name : "-"}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              sx={{
                color: `${dataProductSku.priceDiscount ? "red" : "black"}`,
              }}
            >
              {dataProductSku.priceDiscount
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProductSku.priceDiscount)
                : new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProductSku.price)}
            </Typography>
            {!!dataProductSku.priceDiscount && (
              <Typography
                variant="caption"
                sx={{ textDecorationLine: "line-through" }}
              >
                ${dataProductSku.price}
              </Typography>
            )}
          </TableCell>
          <TableCell align="center">
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{
                ":hover": {
                  background: "none",
                },
              }}
            >
              <Typography
                variant="caption"
                textTransform="capitalize"
                fontWeight="bold"
                sx={{
                  color: "rgba(0, 0, 0, 0.54)",
                }}
              >
                Product variant:
              </Typography>
              {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
              sx={{ zIndex: 3000 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper
                    sx={{
                      "&.MuiPaper-root": {
                        boxShadown: "0 5px 10px 0 rgba(0,0,0,.09)!important",
                        borderColor: "rgba(0,0,0,.09)",
                        padding: "20px",
                        maxWidth: "500px",
                      },
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      {(dataProductSku.product as Product) && (
                        <CartTableBodyVariant
                          item={dataProductSku}
                          handleGetProductSku={handleGetProductSku}
                          i={index}
                        />
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </TableCell>

          <TableCell align="center">
            <InputQuantity
              getQuantity={handleGetQuantity}
              quantityValue={data?.quantity}
              index={index}
              data={dataProductSku}
            />
          </TableCell>
          <TableCell>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              color="black"
            >
              {dataProductSku.priceDiscount
                ? new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProductSku.priceDiscount * data.quantity)
                : new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dataProductSku.price * data.quantity)}
            </Typography>
          </TableCell>
          {/* <TableCell>
        <Typography variant="body2">{data.productSku.price}</Typography>
      </TableCell> */}

          <TableCell>
            <Button onClick={() => handleRemove(index)}>
              <Close />
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
