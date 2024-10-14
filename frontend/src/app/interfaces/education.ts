import {Profile} from "./profile";

export interface Education {
  id: number,
  name: string,
  fromDate: Date,
  toDate: Date,
  finished: string
  profile: Profile
}
