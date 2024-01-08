import { Blog } from "./blog";
import { Main } from "./main";
import { ListOptions } from "./shared";
import { User } from "./user";

export enum CommentStatus {
  Approved = "Approved",
  UnApproved = "UnApproved",
}
export interface Comment extends Main {
  blog: string;
  user: string;
  comment: string;
  status: CommentStatus;
}

export interface GetComment extends Main {
  blog: Blog;
  user: User;
  comment: string;
  status: CommentStatus;
}

export interface CommentHead {
  id: keyof Omit<Comment, "_id">;
  label: string;
}

export type CommentCreateInput = Omit<Comment, "_id" | "createdAt" | "updatedAt">;

export type CommentUpdateInput = Partial<CommentCreateInput>;

export type CommentFilterParams = ListOptions<Comment>;
