import { Address, GetAddress } from "./address";
import { Main } from "./main";
import { Photo } from "./photo";
import { GetProduct } from "./product";
import { Role } from "./role";
import { ListOptions } from "./shared";

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum UserType {
  Personnel = "Personnel",
  Customer = "Customer",
}

export enum UserGender {
  Female = "Female",
  Male = "Male",
  Other = "Other",
}

// export interface User {
//   _id: string;
//   displayName: string;
//   username: string;
//   email: string;
//   tel: string;
//   avatar: string;
//   role: UserRole;
// }

export interface User extends Main {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
  phoneNumber: string;
  avatar?: Photo;
  userType: UserType;
  gender?: UserGender | string;
  address?: Address[];
  roles?: Role[];
  //   refreshToken?: string;
  status: UserStatus;
  products: string[];
}

export interface GetUser extends Main {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  repeatPassword?: string;
  phoneNumber: string;
  avatar?: Photo;
  userType: UserType;
  gender?: UserGender | string;
  address?: GetAddress[];
  roles?: Role[];
  //   refreshToken?: string;
  status: UserStatus;
  products: GetProduct[];
}

// export interface WithPassword {
//   password: string;
// }
export interface WithToken {
  accessToken: string;
  refreshToken: string;
}
export type UserSignIn = Pick<User, "email" | "password">;

export type UserCreateInput = Omit<
  User,
  "_id" | "createdAt" | "updatedAt" | "status" | "userType"
>;

export type UserUpdateInput = Partial<UserCreateInput>;

export type UserFilterParams = ListOptions<User>;

export type UserProductFavorite = {
  product: string;
};
