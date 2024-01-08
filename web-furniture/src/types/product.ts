import { number } from "yup";
import { Category } from "./category";
import { Main } from "./main";
import { SkuValue } from "./option";
import { GetProductSku } from "./product-sku";
import { Review } from "./review";
import { RoomFurniture } from "./room-furniture";
import { ListOptions } from "./shared";

export interface Product extends Main {
  roomFurniture: string;
  category: string;
  name: string;
  installationCost?: number;

  //   view: number;
  isHidden: boolean;
  isArrival: boolean;
  //   isFavorite: boolean;
  description: string;
  content: string;
  skuValues: SkuValue[];
  productSkus: GetProductSku[];
}

export interface GetProduct extends Main {
  roomFurniture: RoomFurniture;
  category: Category;
  name: string;
  installationCost?: number;

  //   view: number;
  isHidden: boolean;
  isArrival: boolean;
  //   isFavorite: boolean;
  description: string;
  content: string;
  productSkus: GetProductSku[];
  reviews: Review[];
  skuValues: SkuValue[];
  // reviews: Review[];
}

export interface ProductHead {
  id: keyof ProductCreateInput;
  label: string;
}
export type ProductCreateInput = Omit<Product, "_id" | "createdAt" | "updatedAt">;

export type ProductUpdateInput = Partial<ProductCreateInput>;

export type ProductFilterParams = ListOptions<Product>;

export interface GetProductCat {
  category: {
    _id: string;
    name: string;
  };
  totalQuantitySold: number;
  products: {
    _id: string;
    name: string;
  }[];
}
