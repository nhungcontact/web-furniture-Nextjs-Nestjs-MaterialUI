import { Main } from "./main";

export interface Address {
  //   street: string;
  province: string;
  //   provinceCode: string;
  district: string;
  //   districtCode: string;
  commune: string;
  //   communeCode: string;
  addressDetail: string;

  isDefault: boolean;
}

export interface GetAddress extends Main {
  //   street: string;
  province: string;
  //   provinceCode: string;
  district: string;
  //   districtCode: string;
  commune: string;
  //   communeCode: string;
  addressDetail: string;

  isDefault: boolean;
}
