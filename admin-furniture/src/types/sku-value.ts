import { Main } from "./main";
import { Option } from "./option";
import { OptionValue } from "./option-value";
import { ListOptions } from "./shared";

export interface SkuValue extends Main {
  optionSku: Option;
  optionValue: OptionValue;
}
export interface SkuValueData {
  [key: number]: SkuValueData[];
  id: number;
  optionSku: Option;
  optionValue: OptionValue;
}

export interface GetSkuValue extends Main {
  optionSku: string;
  optionValue: string;
}
export type SkuValueCreateInput = Omit<GetSkuValue, "_id" | "createdAt" | "updatedAt">;

export type SkuValueUpdateInput = Partial<SkuValueCreateInput>;

export type SkuValueFilterParams = ListOptions<SkuValue>;
