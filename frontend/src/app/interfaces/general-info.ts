import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface GeneralInfo {
  id: number,
  portfolio?: Portfolio,
  gender: string,
  zipCode: string,
  city: string,
  address: string
}
