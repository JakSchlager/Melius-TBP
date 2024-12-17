import {Selectable} from "./Selectable";
import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface ProgrammingKnowledge {
  id?: number,
  programming: Selectable,
  portfolio: Portfolio,
  rating: number
}
