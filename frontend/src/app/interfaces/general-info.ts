import {Profile} from "./profile";

export interface GeneralInfo {
  id: number,
  profile: Profile,
  gender: string,
  zipCode: string,
  city: string,
  address: string
}
