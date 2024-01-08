import { Main } from "./main";
import { Photo } from "./photo";
import { ListOptions } from "./shared";
import { Option } from "./option";

export interface OptionValue extends Main {
  optionSku: string;
  name: string;
  photo: Photo;
}

export interface GetOptionValue extends Main {
  optionSku: Option;
  name: string;
  photo: Photo;
}

export interface OptionValueHead {
  id: keyof Omit<GetOptionValue, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type OptionValueCreateInput = Omit<OptionValue, "_id" | "createdAt" | "updatedAt">;

export type OptionValueUpdateInput = Partial<OptionValueCreateInput>;

export type OptionValueFilterParams = ListOptions<OptionValue>;
