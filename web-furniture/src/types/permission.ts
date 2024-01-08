import { GroupPermission } from "./group-permission";
import { Main } from "./main";
import { ListOptions } from "./shared";
export enum PermissionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}
export interface Permission extends Main {
  groupPermission: string;
  name: string;
  description?: string;
  status: PermissionStatus;
}

export interface GetPermission extends Main {
  groupPermission: GroupPermission;
  name: string;
  description?: string;
  status: PermissionStatus;
}
export interface PermissionHead {
  id: keyof Omit<GetPermission, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type PermissionCreateInput = Omit<Permission, "_id" | "createdAt" | "updatedAt">;

export type PermissionUpdateInput = Partial<PermissionCreateInput>;

export type PermissionFilterParams = ListOptions<Permission>;
