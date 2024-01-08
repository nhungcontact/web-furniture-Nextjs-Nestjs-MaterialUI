import { Main } from "./main";
import { OptionValue } from "./option-value";
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

// export interface GetOption extends Main {
//   name: string;
//   optionValues?: OptionValue[];
// }
export interface OptionNull {
  optionSku: Option | null;
  optionValues: OptionValue[];
}

export interface SkuValue {
  optionSku: string;
  optionValues: string[];
}

export interface OptionHead {
  id: keyof Omit<Option, "_id" | "createdAt" | "updatedAt">;
  label: string;
}

export type OptionCreateInput = Omit<Option, "_id" | "createdAt" | "updatedAt">;

export type OptionUpdateInput = Partial<OptionCreateInput>;

export type OptionFilterParams = ListOptions<Option>;
