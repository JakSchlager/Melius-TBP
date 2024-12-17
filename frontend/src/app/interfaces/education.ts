import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface Education {
  id: number,
  name: string,
  fromDate: Date,
  toDate: Date,
  finished: string
  portfolio: Portfolio
}
