import {Selectable} from "./Selectable";
import {Profile} from "./profile";

export interface SoftwareKnowledge {
  id: number,
  software: Selectable,
  rating: number,
  profile: Profile
}
