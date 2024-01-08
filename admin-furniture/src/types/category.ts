import { Main } from "./main";
import { Photo } from "./photo";
import { RoomFurniture } from "./room-furniture";
import { ListOptions } from "./shared";

export enum CategoryStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Category extends Main {
  roomFurnitures: string[];
  name: string;
  photo: Photo;
  description?: string;
  status: CategoryStatus;
}
export interface GetCategory extends Main {
  roomFurnitures: RoomFurniture[];
  name: string;
  photo: Photo;
  description?: string;
  status: CategoryStatus;
}

export interface CategoryHead {
  id: keyof Omit<GetCategory, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type CategoryCreateInput = Omit<Category, "_id" | "createdAt" | "updatedAt">;

export type CategoryUpdateInput = Partial<CategoryCreateInput>;

export type CategoryFilterParams = ListOptions<Category>;
