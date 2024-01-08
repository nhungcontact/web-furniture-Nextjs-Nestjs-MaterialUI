// /* eslint-disable max-lines */
// "use client";
// import {
//   Box,
//   Button,
//   Divider,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableContainer,
//   Typography,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import CartTableBody from "./CartTableBody";
// // import CategoryTableHead from "./CartTableHead";
// import { CartNotUser } from "@/types/cart";
// import { CartItemInCart, CartItemUpdateInput } from "@/types/cart-item";
// import { GetProduct, Product } from "@/types/product";
// import { GetProductSku } from "@/types/product-sku";
// import { SkuValue } from "@/types/sku-value";
// import CartTableHead from "./CartTableHead";
// // import { useRouter } from "next/navigation";
// import useCartAddCartItemToCart from "@/hooks/carts/useCartAddCartItemToCart";
// import useCartDetail from "@/hooks/carts/useCartDetail";
// import { BillUpdateInput } from "@/types/bill";
// import { BillItemCreateInput } from "@/types/bill-item";
// import { Promotion } from "@/types/promotion";
// import { User } from "@/types/user";
// import getCart from "@/utils/getCart";
// import { useRouter } from "next/navigation";
// import AutocompleteVoucher from "./AutocompleteVoucher";
// import Voucher from "./Voucher";
// type Props = {
//   user?: User;
// };
// export default function CartTable({ user }: Props) {
//   const router = useRouter();
//   const [voucher, setVoucher] = useState<Promotion>();
//   const [priceVoucher, setPriceVoucher] = useState<number>();
//   const [grandTotal, setGrandTotal] = useState<number>();
//   const { data: dataCart } = useCartDetail(user ? user._id : "");
//   const [selected, setSelected] = useState<CartItemInCart[]>([]);
//   const [cart, setCart] = useState<CartNotUser>();
//   const [totalPrice, setToltalPrice] = useState<number>();
//   const { trigger: addCartItem } = useCartAddCartItemToCart(user ? user._id : "");
//   const handleUpdateCart = () => {
//     const cart = getCart();
//     console.log("Cart", cart);
//     if (cart && cart.detailCarts) {
//       setCart(cart as CartNotUser);
//       const result = cart.detailCarts.reduce((value, current) => {
//         return value.concat({
//           productSku: current.productSku._id,
//           quantity: current.quantity,
//         });
//       }, [] as CartItemUpdateInput[]);
//       if (user) {
//         addCartItem({
//           body: {
//             totalPrice: cart.totalPrice,
//             detailCarts: result,
//             user: user._id,
//           },
//         })
//           .then(() => {
//             console.log("Success");
//           })
//           .catch((e) => {
//             console.log(e?.message);
//           });
//       }
//     }
//   };
//   useEffect(() => {
//     handleUpdateCart();
//   }, []);

//   const handleGetQuantity = (value: number, index: number) => {
//     const cartItemsLocal = localStorage.getItem("cartItems");
//     if (cartItemsLocal) {
//       const cartItemsParse = JSON.parse(cartItemsLocal) as CartItemInCart[];
//       const updateData = [...cartItemsParse];

//       updateData[index] = {
//         ...updateData[index],
//         quantity: value,
//       };
//       localStorage.setItem("cartItems", JSON.stringify(updateData));
//       handleUpdateCart();
//       window.location.reload();
//     }
//   };
//   const handleGetProductSku = (value: SkuValue[], index: number, item: GetProductSku) => {
//     const cartItemsLocal = localStorage.getItem("cartItems");
//     if (cartItemsLocal) {
//       const cartItemsParse = JSON.parse(cartItemsLocal) as CartItemInCart[];
//       if (cartItemsParse) {
//         let isDul = false;
//         let product = {} as GetProduct;
//         for (const val of cartItemsParse) {
//           //   check ton tai sản phẩm
//           if (val.product && val.product._id === (item.product as Product)._id) {
//             const r = val.productSku.skuValues.filter((v1) =>
//               value.find(({ optionValue }) => v1.optionValue === optionValue),
//             );
//             product = val.product;

//             if (r.length === value.length) {
//               isDul = true;
//             } else {
//               isDul = false;
//             }
//           }
//         }
//         if (isDul) {
//           alert("The product already exists in the shopping cart!");
//           //   handleCart();
//           handleUpdateCart();
//           window.location.reload();
//         } else {
//           let obj = {} as GetProductSku;
//           for (const sku of product.productSkus) {
//             if (sku.skuValues && sku.skuValues.length > 0) {
//               const findProductSku = sku.skuValues.filter((elem) =>
//                 value.find(({ optionValue }) => elem.optionValue === optionValue),
//               );
//               if (findProductSku.length === value.length) {
//                 obj = sku;
//               }
//             }
//           }
//           const updateData = [...cartItemsParse];
//           updateData[index] = {
//             ...updateData[index],
//             productSku: obj,
//             // skuValues: obj.skuValues,
//           };
//           localStorage.setItem("cartItems", JSON.stringify(updateData));
//           //   handleCart();
//           handleUpdateCart();
//           window.location.reload();
//         }
//       }
//     }
//   };
//   const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       if (dataCart && dataCart.detailCarts) {
//         const newSelected = dataCart.detailCarts.map((n) => n);
//         setSelected(newSelected);
//         let total = 0;
//         for (const val of dataCart.detailCarts) {
//           if (val.productSku.priceDiscount) {
//             total += val.productSku.priceDiscount * val.quantity;
//           } else {
//             total += val.productSku.price * val.quantity;
//           }
//         }
//         setToltalPrice(total);
//       } else if (cart && cart.detailCarts) {
//         const newSelected = cart.detailCarts.map((n) => n);
//         setSelected(newSelected);
//         let total = 0;
//         for (const val of cart.detailCarts) {
//           if (val.productSku.priceDiscount) {
//             total += val.productSku.priceDiscount * val.quantity;
//           } else {
//             total += val.productSku.price * val.quantity;
//           }
//         }
//         setToltalPrice(total);
//       }
//       return;
//     }
//     setSelected([]);
//   };
//   const handleClick = (event: React.MouseEvent<unknown>, data: CartItemInCart) => {
//     const selectedIndex = selected.indexOf(data);
//     let newSelected: CartItemInCart[] = [];
//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, data);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     let total = 0;
//     for (const val of newSelected) {
//       if (val.productSku.priceDiscount) {
//         total += val.productSku.priceDiscount * val.quantity;
//       } else {
//         total += val.productSku.price * val.quantity;
//       }
//     }
//     setToltalPrice(total);
//     setSelected(newSelected);
//   };

//   const isSelected = (name: CartItemInCart) => selected.indexOf(name) !== -1;
//   const handleCheckout = (cart: CartItemInCart[]) => {
//     if (cart && user) {
//       const billItems = localStorage.getItem("bill");
//       if (billItems) {
//         localStorage.removeItem("bill");
//       }
//       let total = 0;
//       for (const val of cart) {
//         if (val.productSku.priceDiscount) {
//           total += val.productSku.priceDiscount * val.quantity;
//         } else {
//           total += val.productSku.price * val.quantity;
//         }
//       }
//       if (total !== 0) {
//         const result = cart.reduce((value, current) => {
//           return value.concat({
//             productSkuId: current.productSku._id,
//             // productSku: current.productSku,
//             quantity: current.quantity,
//             price: current.productSku.priceDiscount
//               ? current.productSku.priceDiscount
//               : current.productSku.price,
//             totalPrice: current.productSku.priceDiscount
//               ? current.productSku.priceDiscount * current.quantity
//               : current.productSku.price * current.quantity,
//             // skuValues: current.productSku.skuValues,
//           } as BillItemCreateInput);
//         }, [] as BillItemCreateInput[]);
//         if (result && result.length) {
//           let bill = {} as BillUpdateInput;
//           if (voucher && priceVoucher) {
//             bill = {
//               user: user._id,
//               grandTotal: Math.ceil(total - priceVoucher),
//               price: total,
//               promotionPrice: priceVoucher,
//               promotion: voucher,
//               billItems: result as BillItemCreateInput[],
//             };
//           } else {
//             bill = {
//               user: user._id,
//               grandTotal: total,
//               price: total,
//               billItems: result as BillItemCreateInput[],
//             };
//           }
//           localStorage.setItem("bill", JSON.stringify(bill));
//           router.push("/checkout");
//         }
//       }
//     } else {
//       alert("Go to sign in or create new an account");
//     }
//   };

//   const handleGetVoucher = (data: Promotion) => {
//     setVoucher(data);
//   };
//   const getPriceVoucher = (number: number) => {
//     setPriceVoucher(number);
//     if (totalPrice && selected.length) {
//       setGrandTotal(Math.ceil(totalPrice - number));
//     }
//   };

//   return (
//     <>
//       <Box sx={{ width: "100%", pt: 4 }}>
//         {/* <CartToolbar
//           numSelected={selected.length}
//           totalPrice={totalPrice}
//         /> */}
//         {(dataCart && dataCart.detailCarts && dataCart.detailCarts.length) ||
//         (!!cart && !!cart.detailCarts && !!cart.detailCarts.length) ? (
//           <Paper variant="outlined">
//             <TableContainer>
//               <Table
//                 stickyHeader
//                 aria-label="sticky table"
//               >
//                 <CartTableHead
//                   onSelectAllClick={handleSelectAllClick}
//                   rowCount={cart?.detailCarts?.length ?? 0}
//                   numSelected={selected.length}
//                 />
//                 {!!user &&
//                 !!dataCart &&
//                 !!dataCart.detailCarts &&
//                 dataCart.detailCarts.length > 0 ? (
//                   <TableBody>
//                     {dataCart.detailCarts.map((item, i) => {
//                       const isItemSelected = isSelected(item);

//                       return (
//                         <CartTableBody
//                           key={item.productSku._id}
//                           data={item}
//                           onClickSelect={handleClick}
//                           isItemSelected={isItemSelected}
//                           handleGetQuantity={handleGetQuantity}
//                           index={`${i}`}
//                           handleGetProductSku={handleGetProductSku}
//                         />
//                       );
//                     })}
//                   </TableBody>
//                 ) : (
//                   <TableBody>
//                     {!!cart &&
//                       !!cart.detailCarts &&
//                       cart.detailCarts.map((item, i) => {
//                         const isItemSelected = isSelected(item);

//                         return (
//                           <CartTableBody
//                             key={item.productSku._id}
//                             data={item}
//                             onClickSelect={handleClick}
//                             isItemSelected={isItemSelected}
//                             handleGetQuantity={handleGetQuantity}
//                             index={`${i}`}
//                             handleGetProductSku={handleGetProductSku}
//                           />
//                         );
//                       })}
//                   </TableBody>
//                 )}
//               </Table>
//             </TableContainer>
//             <Divider />
//           </Paper>
//         ) : (
//           <></>
//         )}
//       </Box>
//       <Divider />
//       {user && (
//         <Grid
//           container
//           justifyContent={"space-between"}
//           sx={{ py: 4 }}
//         >
//           <Grid
//             item
//             xs={12}
//             md={6}
//             mb={2}
//           >
//             <Typography
//               variant="body1"
//               fontWeight="bold"
//             >
//               Voucher
//             </Typography>

//             <AutocompleteVoucher
//               getValue={handleGetVoucher}
//               isDisabled={selected.length ? false : true}
//               user={user}
//             />
//             {!!voucher && !!selected.length && (
//               <Box sx={{ my: 1 }}>
//                 <Typography
//                   variant="body2"
//                   color="grey"
//                   mb={1}
//                   ml={2}
//                 >
//                   Add Voucher
//                 </Typography>

//                 <Voucher
//                   voucher={voucher}
//                   getPriceVoucher={getPriceVoucher}
//                   totalPrice={totalPrice}
//                   //   user={user}
//                 />
//               </Box>
//             )}
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={4}
//           >
//             <Box sx={{ padding: 3 }}>
//               <Typography
//                 variant="h5"
//                 fontWeight={"bold"}
//                 mb={4}
//               >
//                 Subtotal
//               </Typography>
//               <Box>
//                 <Box
//                   display="flex"
//                   mb={2}
//                   justifyContent={"space-between"}
//                   alignItems={"center"}
//                 >
//                   <Typography>{selected.length} product</Typography>
//                   <Typography fontWeight={"bold"}>
//                     {!!selected.length && !!totalPrice && (
//                       <Typography fontWeight={"bold"}>${totalPrice}</Typography>
//                     )}

//                     {!selected.length && <Typography fontWeight={"bold"}>$0</Typography>}
//                   </Typography>
//                 </Box>
//                 <Box
//                   display="flex"
//                   mb={4}
//                   justifyContent={"space-between"}
//                   alignItems={"center"}
//                 >
//                   <Typography>Price Discount</Typography>
//                   <Typography fontWeight={"bold"}>- ${priceVoucher ?? 0}</Typography>
//                 </Box>
//                 <Box
//                   display="flex"
//                   justifyContent={"space-between"}
//                   alignItems={"center"}
//                   mb={4}
//                 >
//                   <Typography
//                     //   variant="h5"
//                     fontWeight={"bold"}
//                   >
//                     Grand Total
//                   </Typography>
//                   {selected.length ? (
//                     <Typography
//                       variant="body1"
//                       fontWeight={"bold"}
//                     >
//                       ${grandTotal ? grandTotal : totalPrice}
//                     </Typography>
//                   ) : (
//                     <b>$0</b>
//                   )}
//                 </Box>
//                 <Box textAlign={"end"}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleCheckout(selected)}
//                     disabled={selected && selected.length > 0 ? false : true}
//                     sx={{ borderRadius: 0 }}
//                   >
//                     Process Order
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//     </>
//   );
// }
