import { CartNotUser } from "@/types/cart";
import { GetCartItem } from "@/types/cart-item";

export default function getCart(): CartNotUser {
  const cartItems = localStorage.getItem("cartItems");

  if (cartItems) {
    const cartItemsParse = JSON.parse(cartItems) as GetCartItem[];
    let totalPrice = 0;

    for (const val of cartItemsParse) {
      if (val.productSku) {
        totalPrice +=
          val.quantity *
          (val.productSku.priceDiscount
            ? val.productSku.priceDiscount
            : val.productSku.price);
      }
    }

    return {
      totalPrice: totalPrice,
      detailCarts: cartItemsParse,
    };
  }

  // If no cart items, return an empty object
  return {
    totalPrice: 0,
    detailCarts: [],
  };
}
