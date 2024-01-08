import { Bill } from "./bill";
import { Main } from "./main";
import { Photo } from "./photo";
import { Product } from "./product";
import { GetProductSku, ProductSku } from "./product-sku";
import { ListOptions } from "./shared";
import { User } from "./user";

export enum ReviewStatus {
  Approved = "Approved",
  UnApproved = "UnApproved",
}

export interface Review extends Main {
  user: string;
  bill: string;
  productSku: string;
  product: string;
  content: string;
  rating: number;
  photos?: Photo[];
  isReport: boolean;
  status: ReviewStatus;
}

export interface GetReview extends Main {
  user: User;
  bill: Bill;
  productSku: GetProductSku;
  product: Product;
  content: string;
  rating: number;
  photos?: Photo[];
  isReport: boolean;
  status: ReviewStatus;
}

export type ReviewCreateInput = Omit<Review, "_id" | "createdAt" | "updatedAt">;

export type ReviewUpdateInput = Partial<ReviewCreateInput>;

export type ReviewFilterParams = ListOptions<Review>;
