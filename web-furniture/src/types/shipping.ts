import { Main } from "./main";
import { ListOptions } from "./shared";

export enum ShippingStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Shipping extends Main {
  provinceApply: string;
  price: number;
  status: ShippingStatus;
}

export interface ShippingHead {
  id: keyof Omit<Shipping, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type ShippingCreateInput = Omit<Shipping, "_id" | "createdAt" | "updatedAt">;

export type ShippingUpdateInput = Partial<ShippingCreateInput>;

export type ShippingFilterParams = ListOptions<Shipping>;
