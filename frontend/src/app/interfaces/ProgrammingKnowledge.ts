import {Selectable} from "./Selectable";
import {Profile} from "./profile";

export interface ProgrammingKnowledge {
  id?: number,
  programming: Selectable,
  profile: Profile,
  rating: number
}
