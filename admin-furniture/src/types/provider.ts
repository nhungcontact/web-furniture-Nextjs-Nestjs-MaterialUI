import { Address } from "./address";
import { Main } from "./main";
import { ListOptions } from "./shared";

export enum ProviderStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export interface Provider extends Main {
  name: string;
  email: string;
  phoneNumber: string;
  address: Address;
  status: ProviderStatus;
}

export interface ProviderHead {
  id: keyof Omit<Provider, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type ProviderCreateInput = Omit<Provider, "_id" | "createdAt" | "updatedAt">;

export type ProviderUpdateInput = Partial<ProviderCreateInput>;

export type ProviderFilterParams = ListOptions<Provider>;
