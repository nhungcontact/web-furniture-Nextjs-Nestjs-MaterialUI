import { Main } from "./main";
import { GetPermission } from "./permission";
import { ListOptions } from "./shared";

export interface Role extends Main {
  permissions: string[];
  name: string;
  description?: string;
}

export interface GetRole extends Main {
  permissions: GetPermission[];
  name: string;
  description?: string;
}

export interface RoleHead {
  id: keyof Omit<GetRole, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type RoleCreateInput = Omit<Role, "_id" | "createdAt" | "updatedAt">;

export type RoleUpdateInput = Partial<RoleCreateInput>;

export type RoleFilterParams = ListOptions<Role>;
