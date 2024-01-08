import { Category } from "./category";
import { Main } from "./main";
import { OptionNull, SkuValue } from "./option";
import { GetProductSku } from "./product-sku";
import { RoomFurniture } from "./room-furniture";
import { ListOptions } from "./shared";

export interface Product extends Main {
  roomFurniture: string;
  category: string;
  name: string;
  installationCost?: number;
  totalQuantity: number;
  //   view: number;
  isHidden: boolean;
  isArrival: boolean;
  //   isFavorite: boolean;
  description: string;
  content: string;
  skuValues: SkuValue[];
  //   productSkus?: string[];
  // reviews: Review[];
}

export interface GetProduct extends Main {
  roomFurniture: RoomFurniture;
  category: Category;
  name: string;
  installationCost?: number;
  totalQuantity: number;
  //   view: number;
  isHidden: boolean;
  isArrival: boolean;
  //   isFavorite: boolean;
  description: string;
  content: string;
  productSkus: GetProductSku[];
  skuValues: OptionNull[];
  // reviews: Review[];
}

export interface ProductHead {
  id: keyof ProductCreateInput;
  label: string;
}
export type ProductCreateInput = Omit<
  Product,
  "_id" | "createdAt" | "updatedAt" | "skuValues"
>;

export type ProductUpdateInput = Partial<ProductCreateInput>;

export type ProductFilterParams = ListOptions<Product>;
