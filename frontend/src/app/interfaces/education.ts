import {UserRegistrationData} from "./user-registration-data";

export interface Education {
  id: number,
  name: string,
  fromDate: Date,
  toDate: Date,
  finished: string
  profile: UserRegistrationData
}
