import { Category } from "./category";
import { GetComment } from "./comment";
import { Main } from "./main";
import { Photo } from "./photo";
import { RoomFurniture } from "./room-furniture";
import { ListOptions } from "./shared";

export enum BlogStatus {
  Approved = "Approved",
  Unapproved = "Unapproved",
}

export interface Blog extends Main {
  name: string;
  category: string;
  roomFurniture: string;
  actor: string;
  description: string;
  content: string;
  isNew: boolean;
  view: number;
  photo?: Photo;
  status: BlogStatus;
}

export interface GetBlog extends Main {
  name: string;
  category: Category;
  roomFurniture: RoomFurniture;
  actor: string;
  description: string;
  content: string;
  isNew: boolean;
  view: number;
  photo?: Photo;
  status: BlogStatus;
  comments: GetComment[];
}

export interface BlogHead {
  id: keyof Omit<GetBlog, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type BlogCreateInput = Omit<Blog, "_id" | "createdAt" | "updatedAt">;

export type BlogUpdateInput = Partial<BlogCreateInput>;

export type BlogFilterParams = ListOptions<Blog>;
