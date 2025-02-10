import {Portfolio} from "./Portfolio";

export interface GHRepo {
  id: number,
  url: string,
  username: string,
  repoName: string,
  description: string,
  language: string
  portfolio: Portfolio
}
