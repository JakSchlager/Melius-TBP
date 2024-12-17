import {Profile} from "./profile";
import {GeneralInfo} from "./general-info";
import {Education} from "./education";
import {WorkExperience} from "./work-experience";
import {KnownLanguage} from "./KnownLanguage";
import {ProgrammingKnowledge} from "./ProgrammingKnowledge";
import {SoftwareKnowledge} from "./SoftwareKnowledge";

export interface Portfolio {
  profile: Profile,
  generalInfo: GeneralInfo,
  educations: Education[],
  workExperiences: WorkExperience[],
  knownLanguages: KnownLanguage[],
  programmingKnowledges: ProgrammingKnowledge[],
  softwareKnowledges: SoftwareKnowledge[],
}
