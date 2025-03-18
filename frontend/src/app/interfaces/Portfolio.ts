import {Profile} from "./profile";
import {GeneralInfo} from "./general-info";
import {Education} from "./education";
import {WorkExperience} from "./work-experience";
import {KnownLanguage} from "./KnownLanguage";
import {ProgrammingKnowledge} from "./ProgrammingKnowledge";
import {SoftwareKnowledge} from "./SoftwareKnowledge";
import {Selectable} from "./Selectable";
import {GHRepo} from "./GHRepo";
import {Image} from "./image";

export interface Portfolio {
  profile: Profile,
  generalInfo: GeneralInfo,
  generalInfoPosition?: string,
  characteristics?: Selectable[],
  characteristicsPosition?: string,
  educations?: Education[],
  educationsPosition?: string,
  workExperiences?: WorkExperience[],
  workExperiencesPosition?: string,
  knownLanguages?: KnownLanguage[],
  knownLanguagesPosition?: string,
  programmingKnowledges?: ProgrammingKnowledge[],
  programmingKnowledgesPosition?: string,
  softwareKnowledges?: SoftwareKnowledge[],
  softwareKnowledgesPosition?: string,
  languageCode: string,
  color: string,
  backgroundImage?: any,
  ghRepos?: GHRepo[],
}
