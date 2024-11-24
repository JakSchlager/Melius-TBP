import {Selectable} from "./Selectable";

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  githubUser: string
  characteristics: Selectable[]
}
