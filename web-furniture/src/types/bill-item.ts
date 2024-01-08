import { Main } from "./main";
import { GetProduct } from "./product";
import { GetProductSku } from "./product-sku";
import { ListOptions } from "./shared";

export interface BillItem extends Main {
  productSkuId: string;
  //   productSku: GetProductSku;
  price: number;
  quantity: number;
  totalPrice: number;
  //   skuValues: SkuValueCreateInput[];
}

export interface GetBillItem extends Main {
  //   bill: Bill;
  productSkuId: GetProductSku;
  productSku: GetProductSku;
  product: GetProduct;
  price: number;
  quantity: number;
  totalPrice: number;
  //   skuValues: SkuValueCreateInput[];
}

export type BillItemCreateInput = Omit<BillItem, "_id" | "createdAt" | "updatedAt">;

export type BillItemUpdateInput = Partial<BillItemCreateInput>;

export type BillItemFilterParams = ListOptions<BillItem>;
