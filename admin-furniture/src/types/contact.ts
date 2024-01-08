import { Main } from "./main";
import { ListOptions } from "./shared";

export enum ContactStatus {
  Responsed = "Responsed",
  NoResponse = "NoResponse",
}
export interface Contact extends Main {
  username: string;
  email: string;
  phoneNumber: string;
  contact: string;
  status: ContactStatus;
}
export interface ContactHead {
  id: keyof Omit<Contact, "_id">;
  label: string;
}
export type ContactCreateInput = Omit<Contact, "_id" | "createdAt" | "updatedAt">;

export type ContactUpdateInput = Partial<ContactCreateInput>;

export type ContactFilterParams = ListOptions<Contact>;
