import { Main } from "./main";
import { ListOptions } from "./shared";

export enum PromotionStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum PromotionType {
  Percent = "Percent",
  Number = "Number",
}

export interface Promotion extends Main {
  name: string;
  couponCode: string;
  quantity: number;
  priceMinimumApply: number;
  percentDiscount?: number;
  priceMaximumByPercent?: number;
  numberDiscountByNumber?: number;
  dateExpire: Date;
  dateApply: Date;
  description: string;
  type: PromotionType;
  status: PromotionStatus;
}

export interface PromotionHead {
  id: keyof Omit<Promotion, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type PromotionCreateInput = Omit<Promotion, "_id" | "createdAt" | "updatedAt">;

export type PromotionUpdateInput = Partial<PromotionCreateInput>;

export type PromotionFilterParams = ListOptions<Promotion>;
