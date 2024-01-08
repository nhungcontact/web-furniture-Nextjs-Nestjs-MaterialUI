import { Main } from "./main";
import { GetProduct } from "./product";
import { GetProductSku } from "./product-sku";
import { ListOptions } from "./shared";

export interface BillItem extends Main {
  productSku: GetProductSku;
  productSkuId: GetProductSku;
  product: GetProduct;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface BillItemHead {
  id: keyof Omit<BillItem, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type BillItemCreateInput = Omit<BillItem, "_id" | "createdAt" | "updatedAt">;

export type BillItemUpdateInput = Partial<BillItemCreateInput>;

export type BillItemFilterParams = ListOptions<BillItem>;
