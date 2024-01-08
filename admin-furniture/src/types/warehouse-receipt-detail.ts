import { Main } from "./main";
import { GetProductSku } from "./product-sku";
import { ListOptions } from "./shared";

export interface WarehouseReceiptDetail extends Main {
  productSku: string | GetProductSku;
  quantity: number;
  price: number;
  //   warehouseReceiptDetails;
}
export interface WarehouseReceiptDetailHead {
  id: keyof Omit<WarehouseReceiptDetail, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type WarehouseReceiptDetailCreateInput = Omit<
  WarehouseReceiptDetail,
  "_id" | "createdAt" | "updatedAt"
>;

export type WarehouseReceiptDetailUpdateInput =
  Partial<WarehouseReceiptDetailCreateInput>;

export type WarehouseReceiptDetailFilterParams = ListOptions<WarehouseReceiptDetail>;
