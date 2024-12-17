import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface WorkExperience {
  id: number;
  company: string,
  fromDate: Date,
  toDate: Date,
  information: string,
  portfolio: Portfolio
}
