/* eslint-disable max-lines */
import useCartItemRemove from "@/hooks/cart-items/useCartItemRemove";
import useProductSkuDetail from "@/hooks/product-skus/useProductSkuDetail";
import { CartItemInCart, GetCartItem } from "@/types/cart-item";
import { Product } from "@/types/product";
import getCart from "@/utils/getCart";
import { Close } from "@mui/icons-material";
import { Box, Button, Checkbox, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
type Props = {
  data?: CartItemInCart | GetCartItem;
  onClickSelect: (
    event: React.MouseEvent<unknown>,
    id: CartItemInCart | GetCartItem,
  ) => void;
  isItemSelected?: boolean;
  //   handleGetQuantity: (value: number, index: number) => void;
  index: string;
  //   handleGetProductSku: (value: SkuValue[], index: number, item: GetProductSku) => void;
};
export default function CategoryTableBody({
  data,
  isItemSelected,
  onClickSelect,
  //   handleGetQuantity,
  index,
}: //   handleGetProductSku,
Props) {
  const { data: dataProductSku } = useProductSkuDetail(data ? data.productSku._id : "");
  const { trigger: removeCartItem } = useCartItemRemove(
    data ? (data as GetCartItem)._id : "",
  );
  //   const { data: dataCartItem } = useCartItemDetail(data ? (data as GetCartItem)._id : "");

  const handleClick = (
    event: React.MouseEvent<unknown>,
    data: CartItemInCart | GetCartItem,
  ) => {
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

  const handleRemove = (index: number) => {
    if (data && (data as GetCartItem)._id) {
      removeCartItem()
        .then(() => {
          alert("success");
          const cart = getCart();
          if (cart && cart.detailCarts && cart.detailCarts.length) {
            let cartItem = {} as CartItemInCart;
            for (let i = 0; i < cart.detailCarts.length; i++) {
              if (index === i) {
                cartItem = cart.detailCarts[i];
              }
            }
            const val = cart.detailCarts.filter(
              (item) => item.productSku._id !== cartItem.productSku._id,
            );
            localStorage.removeItem("cartItems");
            localStorage.setItem("cartItems", JSON.stringify(val));
          }
          window.location.reload();
        })
        .catch((e) => {
          alert(e?.message);
        });
    }
  };

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
              color="black"
            >
              $
              {dataProductSku.priceDiscount
                ? dataProductSku.priceDiscount
                : dataProductSku.price}
            </Typography>
            {!!dataProductSku.priceDiscount && (
              <Typography
                variant="h4"
                sx={{ textDecorationLine: "line-through" }}
                display={"inline"}
              >
                ${dataProductSku.price}
              </Typography>
            )}
          </TableCell>
          {/* <TableCell align="center">
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
                        <CartTableBodyType
                          item={dataProductSku}
                        //   skuValues={dataProductSku.skuValues}
                        //   handleGetProductSku={handleGetProductSku}
                          i={Number(index)}
                        />
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </TableCell> */}

          {/* <TableCell align="center">
            <InputQuantity
              getQuantity={handleGetQuantity}
              quantityValue={data?.quantity}
              index={`${index}`}
            />
          </TableCell> */}
          <TableCell>
            <Typography
              variant="body2"
              fontWeight={"bold"}
              color="black"
            >
              $
              {dataProductSku.priceDiscount
                ? dataProductSku.priceDiscount * data.quantity
                : dataProductSku.price * data.quantity}
            </Typography>
          </TableCell>
          {/* <TableCell>
        <Typography variant="body2">{data.productSku.price}</Typography>
      </TableCell> */}

          <TableCell>
            <Button onClick={() => handleRemove(+index)}>
              <Close />
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
