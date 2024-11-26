import {Profile} from "./profile";

export interface KnownLanguage {
  id?: number,
  language: string,
  rating: number,
  profile: Profile
}
