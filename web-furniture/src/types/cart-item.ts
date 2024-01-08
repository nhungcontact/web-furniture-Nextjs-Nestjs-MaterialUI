import { Main } from "./main";
import { GetProduct } from "./product";
import { GetProductSku } from "./product-sku";
import { ListOptions } from "./shared";
// import { Promotion } from "./promotion";

export interface CartItem extends Main {
  productSku: string;
  quantity: number;
  price?: number;
  //   skuValues: SkuValueCreateInput[];
  product: GetProduct;
}

export interface GetCartItem extends Main {
  productSku: GetProductSku;
  quantity: number;
  price?: number;
  product: GetProduct;
}

// export interface CartItemNoUser extends Main {
//   productSku: GetProductSku;
//   quantity: number;
//   price?: number;
//   product: GetProduct;
// }

export type CartItemInCart = Omit<GetCartItem, "_id" | "createdAt" | "updatedAt">;

export type CartItemCreateInput = Omit<CartItem, "_id" | "createdAt" | "updatedAt">;

export type CartItemUpdateInput = Partial<CartItemCreateInput>;

export type CartItemFilterParams = ListOptions<CartItem>;
