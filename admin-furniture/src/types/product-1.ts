import { ListOptions } from "./shared";

export interface Product {
  _id: string;
  name: string;
  image: string;
  desc: string;
  price: string;
}

export type ProductCreateInput = Omit<Product, "id">;

export type ProductUpdateInput = Partial<ProductCreateInput>;

export type ProductFilterParams = ListOptions<Product>;
