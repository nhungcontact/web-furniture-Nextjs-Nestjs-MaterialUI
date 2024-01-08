import { CartItemInCart, CartItemUpdateInput, GetCartItem } from "./cart-item";
import { Main } from "./main";
import { ListOptions } from "./shared";
import { User } from "./user";

export enum CartStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface CartNotUser {
  totalPrice: number;
  installationCost?: number;
  //   promotion?:
  detailCarts: GetCartItem[];
}

export interface Cart extends Main {
  user: string;
  totalPrice: number;
  installationCost?: number;
  detailCarts: CartItemUpdateInput[];
}

export interface GetCart extends Main {
  user: User;
  totalPrice: number;
  installationCost?: number;
  detailCarts: GetCartItem[];
}

export interface AddCartItem {
  totalPrice: number;
  installationCost?: number;
  //   promotion?:
  cartItem: CartItemInCart;
}

export type CartCreateInput = Omit<Cart, "_id" | "createdAt" | "updatedAt">;

export type CartUpdateInput = Partial<CartCreateInput>;

export type CartFilterParams = ListOptions<Cart>;
