import { Address } from "./address";
import { BillItem } from "./bill-item";
import { Main } from "./main";
import { Promotion } from "./promotion";
import { RequestCancel } from "./request-cancel";
import { ListOptions } from "./shared";
import { User } from "./user";

export enum BillStatus {
  Waiting = "Waiting",
  Processing = "Processing",
  Shipping = "Shipping",
  Success = "Success",
  Cancel = "Cancel",
}
export enum BillPaymentMethod {
  Cod = "Cod",
  Card = "Card",
}

export interface Bill extends Main {
  user: string;
  promotion: string;
  number: string;
  grandTotal: number;
  installationCost?: number;
  price: number;
  promotionPrice: number;
  message: string;
  address: Address;
  billItems: BillItem[];
  paymentMethod: BillPaymentMethod;
  status: BillStatus;
  requestCancel: RequestCancel;
  shipping: number;
  cardName: string;
}

export interface GetBill extends Main {
  user: User;
  promotion: Promotion;
  number: string;
  grandTotal: number;
  installationCost?: number;
  price: number;
  promotionPrice: number;
  message: string;
  address: Address;
  billItems: BillItem[];
  paymentMethod: BillPaymentMethod;
  status: BillStatus;
  requestCancel: RequestCancel;
  shipping: number;
  cardName: string;
}

export interface BillHead {
  id: keyof Omit<Bill, "_id" | "updatedAt">;
  label: string;
}

export type BillCreateInput = Omit<Bill, "_id" | "createdAt" | "updatedAt">;

export type BillUpdateInput = Partial<BillCreateInput>;

export type BillFilterParams = ListOptions<Bill>;

export interface QuanityBillItem {
  numberbillItems: number;
}

export interface MonthlyBillItem {
  numberBillItems: number;
  grandTotal: number;
  avgGrandTotal: number;
  minPrice: number;
  maxPrice: number;
  month: number;
}

export interface WeeklyBillItem {
  numberBillItems: number;
  grandTotal: number;
  avgGrandTotal: number;
  minPrice: number;
  maxPrice: number;
  week: number;
  weekDayName: string;
}

export interface YearlyBillItem {
  numberBillItems: number;
  grandTotal: number;
  avgGrandTotal: number;
  minPrice: number;
  maxPrice: number;
  year: number;
}

export interface TopCustomer {
  totalAmount: number;
  user: string;
}
export interface DatesBetween {
  date: Date;
  totalRevenue: number;
  totalProfit: number;
  totalOrders: number;
  totalProducts: number;
}
