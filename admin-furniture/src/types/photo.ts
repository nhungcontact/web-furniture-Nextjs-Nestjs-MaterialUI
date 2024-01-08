import { Main } from "./main";
import { ListOptions } from "./shared";

export interface Photo extends Main {
  ownerID: string;
  name: string;
  imageURL: string;
}

export type PhotoCreateInput = Omit<Photo, "_id">;

export type PhotoUpdateInput = Partial<PhotoCreateInput>;

export type PhotoFilterParams = ListOptions<Photo>;