import {Characteristic} from "./Characteristic";

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  githubUser: string
  characteristics: Characteristic[]
}
