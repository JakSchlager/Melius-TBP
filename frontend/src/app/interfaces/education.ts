import {User} from "./user";

export interface Education {
  id: number,
  name: string,
  fromDate: Date,
  toDate: Date,
  finished: string
  user: User
}
