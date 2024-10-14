import {Profile} from "./profile";

export interface WorkExperience {
  id: number;
  company: string,
  fromDate: Date,
  toDate: Date,
  information: string,
  profile: Profile
}
