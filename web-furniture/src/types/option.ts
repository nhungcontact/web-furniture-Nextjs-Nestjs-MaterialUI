import { Main } from "./main";
import { GetOptionValue, OptionValue } from "./option-value";
import { ListOptions } from "./shared";

export enum DisplayOption {
  OPTION_TEXT = "OPTION_TEXT",
  OPTION_PHOTO = "OPTION_PHOTO",
}

export interface Option extends Main {
  name: string;
  optionValues?: OptionValue[];
  displayOption: DisplayOption;
}
export interface GetOptionNull extends Main {
  optionSku: Option;
  optionValues: GetOptionValue[];
}
export interface OptionNull {
  optionSku: Option | null;
  optionValues: OptionValue[];
}

export interface SkuValue extends Main {
  optionSku: Option;
  optionValues: OptionValue[];
}

export interface OptionHead {
  id: keyof Omit<Option, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type OptionCreateInput = Omit<Option, "_id" | "createdAt" | "updatedAt">;

export type OptionUpdateInput = Partial<OptionCreateInput>;

export type OptionFilterParams = ListOptions<Option>;
