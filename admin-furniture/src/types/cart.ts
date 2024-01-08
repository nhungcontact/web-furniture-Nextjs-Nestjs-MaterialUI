import { CartItem, CartItemCreateInput } from "./cart-item";
import { Main } from "./main";
import { ListOptions } from "./shared";
import { User } from "./user";

export interface Cart extends Main {
  user: string;
  totalPrice: number;
  installationCost?: number;
  //   promotion?:
  cartItems: CartItemCreateInput[];
}

export interface GetCart extends Main {
  user: User;
  totalPrice: number;
  installationCost?: number;
  //   promotion?:
  cartItems: CartItem[];
}

export type CartCreateInput = Omit<Cart, "_id" | "createdAt" | "updatedAt">;

export type CartUpdateInput = Partial<CartCreateInput>;

export type CartFilterParams = ListOptions<Cart>;
