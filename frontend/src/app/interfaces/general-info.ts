import {UserRegistrationData} from "./user-registration-data";

export interface GeneralInfo {
  profile: UserRegistrationData,
  gender: string,
  zipCode: string,
  city: string,
  address: string
}
