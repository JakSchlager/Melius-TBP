import {User} from "./user";

export interface WorkExperience {
  id: number;
  company: string,
  fromDate: Date,
  toDate: Date,
  information: string,
  user: User
}
