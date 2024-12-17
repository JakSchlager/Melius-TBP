import {Profile} from "./profile";
import {Portfolio} from "./Portfolio";

export interface KnownLanguage {
  id?: number,
  language: string,
  rating: number,
  portfolio: Portfolio
}
