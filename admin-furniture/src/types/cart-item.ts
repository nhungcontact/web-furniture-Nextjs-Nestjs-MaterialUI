import { Main } from "./main";
import { ProductSku } from "./product-sku";
import { ListOptions } from "./shared";
// import { Promotion } from "./promotion";
import { SkuValue, SkuValueCreateInput } from "./sku-value";

export interface CartItem extends Main {
  productSku: string;
  quantity: number;
  price: number;
  skuValue: SkuValueCreateInput[];
}

export interface GetCartItem extends Main {
  productSku: ProductSku;
  quantity: number;
  price: number;
  skuValue: SkuValue[];
}

export type CartItemCreateInput = Omit<CartItem, "_id" | "createdAt" | "updatedAt">;

export type CartItemUpdateInput = Partial<CartItemCreateInput>;

export type CartItemFilterParams = ListOptions<CartItem>;
