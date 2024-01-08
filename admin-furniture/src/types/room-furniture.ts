import { Category } from "./category";
import { Main } from "./main";
import { Photo } from "./photo";
import { ListOptions } from "./shared";

export enum RoomFurnitureStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface RoomFurniture extends Main {
  name: string;
  photo: Photo;
  description: string;
  categories?: Category[];
  status: RoomFurnitureStatus;
}
export interface RoomFurnitureHead {
  id: keyof Omit<RoomFurniture, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type RoomFurnitureCreateInput = Omit<
  RoomFurniture,
  "_id" | "createdAt" | "updatedAt"
>;

export type RoomFurnitureUpdateInput = Partial<RoomFurnitureCreateInput>;

export type RoomFurnitureFilterParams = ListOptions<RoomFurniture>;
