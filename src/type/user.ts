export enum EGender {
  M = "M",
  F = "F",
}

export interface IUserProfile {
  phone: string;
  password: string;
  fullname: string;
  gender: EGender;
  height: number;
  weight: number;
  age: number;
}
