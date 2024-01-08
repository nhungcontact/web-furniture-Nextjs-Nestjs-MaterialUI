import { Main } from "./main";
import { GetPermission } from "./permission";
import { ListOptions } from "./shared";

export interface GroupPermission extends Main {
  name: string;
  description?: string;
  permissions?: GetPermission[];
}
export interface GroupPermissionHead {
  id: keyof Omit<GroupPermission, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type GroupPermissionCreateInput = Omit<GroupPermission, "_id">;

export type GroupPermissionUpdateInput = Partial<GroupPermissionCreateInput>;

export type GroupPermissionFilterParams = ListOptions<GroupPermission>;
