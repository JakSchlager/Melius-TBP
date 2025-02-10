import {Selectable} from "./Selectable";
import {ProgrammingKnowledge} from "./ProgrammingKnowledge";
import {KnownLanguage} from "./KnownLanguage";
import {Portfolio} from "./Portfolio";
import {Group} from "./group";

export interface Profile {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  profileImage?: Blob
  portfolio?: Portfolio
  groups?: Group[]
}
