import {Profile} from "./profile";

export interface Group {
  id: number,
  name: string,
  company: string,
  department: string,
  password: string,
  maxMembers: number,
  members: Profile[]
}
