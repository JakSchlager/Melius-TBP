import {Selectable} from "./Selectable";
import {ProgrammingKnowledge} from "./ProgrammingKnowledge";
import {KnownLanguage} from "./KnownLanguage";
import {Portfolio} from "./Portfolio";

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  githubUser?: string
  profileImage?: Blob
  portfolio?: Portfolio
}
