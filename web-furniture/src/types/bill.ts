import { Address } from "./address";
import { BillItem, BillItemCreateInput, GetBillItem } from "./bill-item";
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
  promotion?: Promotion;
  number: string;
  grandTotal: number;
  installationCost?: number;
  price: number;
  promotionPrice?: number;
  message?: string;
  address: Address;
  billItems: BillItemCreateInput[] | GetBillItem[];
  paymentMethod: BillPaymentMethod;
  cardName?: string;
  status: BillStatus;
  requestCancel: RequestCancel;
  billId?: string;
  shipping?: number;
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
  billItems: GetBillItem[];
  paymentMethod: BillPaymentMethod;
  cardName?: string;
  status: BillStatus;
  requestCancel: RequestCancel;
  shipping: number;
}
export interface BillLocal {
  user: string;
  price: number;
  billItems: BillItemCreateInput[];
}
export type BillCreateInput = Omit<Bill, "_id" | "createdAt" | "updatedAt">;

export type BillUpdateInput = Partial<BillCreateInput>;

export type BillFilterParams = ListOptions<Bill>;

export interface CartPayment {
  _id: string;
  message: string;
  clientSecret: string;
  paymentIntentID: string;
  bill?: string;
}

export interface PaymentMethod {
  paymentMethod: string;
  paymentIntentID: string;
  billId: string;
}
