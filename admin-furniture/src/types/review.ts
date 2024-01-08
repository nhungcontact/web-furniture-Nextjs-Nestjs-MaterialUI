import { Bill } from "./bill";
import { Main } from "./main";
import { Photo } from "./photo";
import { Product } from "./product";
import { GetProductSku } from "./product-sku";
import { ListOptions } from "./shared";
import { User } from "./user";

export enum ReviewStatus {
  Approved = "Approved",
  UnApproved = "UnApproved",
}

export interface Review extends Main {
  user: string;
  productSku: string;
  bill: string;
  product: string;
  //   product: string;
  content: string;
  rating: number;
  photos?: Photo[];

  status: ReviewStatus;
}

export interface GetReview extends Main {
  user: User;
  //   product: Product;
  product: Product;
  productSku: GetProductSku;
  bill: Bill;
  content: string;
  rating: number;
  photos?: Photo[];

  status: ReviewStatus;
}

export interface ReviewHead {
  id: keyof Omit<Review, "_id">;
  label: string;
}

export type ReviewCreateInput = Omit<Review, "_id" | "createdAt" | "updatedAt">;

export type ReviewUpdateInput = Partial<ReviewCreateInput>;

export type ReviewFilterParams = ListOptions<Review>;
