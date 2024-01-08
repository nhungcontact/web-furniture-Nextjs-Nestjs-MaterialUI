import { Address } from "./address";
import { Main } from "./main";
import { ListOptions } from "./shared";

export enum ProviderStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface Provider extends Main {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: Address;
  status: ProviderStatus;
}

export type ProviderCreateInput = Omit<Provider, "_id" | "createdAt" | "updatedAt">;

export type ProviderUpdateInput = Partial<ProviderCreateInput>;

export type ProviderFilterParams = ListOptions<Provider>;
