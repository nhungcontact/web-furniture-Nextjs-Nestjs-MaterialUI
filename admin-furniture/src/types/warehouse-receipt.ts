import { Main } from "./main";
import { Provider } from "./provider";
import { ListOptions } from "./shared";
import { User } from "./user";
import { WarehouseReceiptDetail } from "./warehouse-receipt-detail";

// import { WarehouseReceiptDetailCreateInput } from "./warehouse-receipt-detail";
export enum WRStatus {
  Approved = "Approved",
  UnApproved = "UnApproved",
}
export interface WarehouseReceipt extends Main {
  user: string;
  provider: string;
  //   warehouseReceiptDetails: WarehouseReceiptDetailCreateInput[];
  warehouseReceiptDetails: string;
  importDate: Date;
  confirmationDate: Date;
  note?: string;
  totalPrice: number;
  status: WRStatus;
}
export interface GetWarehouseReceipt extends Main {
  user: User;
  provider: Provider;
  //   warehouseReceiptDetails: WarehouseReceiptDetailCreateInput[];
  warehouseReceiptDetails: WarehouseReceiptDetail[];
  importDate: Date;
  confirmationDate: Date;
  note?: string;
  totalPrice: number;
  status: WRStatus;
}

export interface WarehouseReceiptHead {
  id: keyof Omit<GetWarehouseReceipt, "_id" | "createdAt" | "updatedAt">;
  label: string;
}
export interface WarehouseReceiptCreateInput {
  user: string;
  provider: string;
  //   warehouseReceiptDetails: WarehouseReceiptDetailCreateInput[];
  warehouseReceiptDetails: WarehouseReceiptDetail[];
  //   importDate: Date;
  confirmationDate?: Date;
  note?: string;
  totalPrice: number;
  status?: WRStatus;
  id?: string;
}
export type WarehouseReceiptUpdateInput = Partial<WarehouseReceiptCreateInput>;

export type WarehouseReceiptFilterParams = ListOptions<WarehouseReceipt>;
