import {Selectable} from "./Selectable";
import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface SoftwareKnowledge {
  id: number,
  software: Selectable,
  rating: number,
  portfolio: Portfolio
}
