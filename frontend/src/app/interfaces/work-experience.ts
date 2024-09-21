import {UserRegistrationData} from "./user-registration-data";

export interface WorkExperience {
  id: number;
  company: string,
  fromDate: Date,
  toDate: Date,
  information: string,
  profile: UserRegistrationData
}
