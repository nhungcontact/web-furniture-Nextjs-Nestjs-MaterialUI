import { Main } from "./main";
import { ListOptions } from "./shared";

export interface DisplayOption extends Main {
  description: string;
  name: string;
}

export interface DisplayOptionHead {
  id: keyof DisplayOptionCreateInput;
  label: string;
}

export type DisplayOptionCreateInput = Omit<
  DisplayOption,
  "_id" | "createdAt" | "updatedAt"
>;

export type DisplayOptionUpdateInput = Partial<DisplayOptionCreateInput>;

export type DisplayOptionFilterParams = ListOptions<DisplayOption>;
