import { Main } from "./main";
import { GetOptionValue } from "./option-value";
import { Photo } from "./photo";
import { Product } from "./product";
import { GetReview } from "./review";
import { ListOptions } from "./shared";

export interface ProductSku extends Main {
  product: Product;
  price: number;
  priceDiscount?: number;
  percent?: number;
  quantitySold?: number;
  quantityInStock: number;
  numberSKU: string;
  content: string;
  photos: Photo[];
  optionValues: string[];
  reviews?: string[];
}

export interface GetProductSku extends Main {
  product: Product;
  price: number;
  priceDiscount?: number;
  percent?: number;
  quantitySold?: number;
  quantityInStock: number;
  numberSKU: string;
  content: string;
  photos: Photo[];
  optionValues: GetOptionValue[];
  reviews?: GetReview[];
}
export interface ProductSkuHead {
  id: keyof Omit<GetProductSku, "_id" | "createdAt" | "updatedAt">;
  label: string;
}
export type ProductSkuCreateInput = Omit<ProductSku, "_id" | "createdAt" | "updatedAt">;

export type ProductSkuUpdateInput = Partial<ProductSkuCreateInput>;

export type ProductSkuFilterParams = ListOptions<ProductSku>;
