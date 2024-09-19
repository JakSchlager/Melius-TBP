import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Education} from "../interfaces/education";
import {WorkExperience} from "../interfaces/work-experience";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/work-experience/";

  constructor() { }

  updateWorkExperience(workExperience: WorkExperience) {
    return this.httpClient.post<WorkExperience>(this.url + "update", workExperience);
  }

  getWorkExperiencesByProfileId(profileId: number) {
    return this.httpClient.get<WorkExperience[]>(this.url + "get/" + profileId);
  }

  deleteWorkExperience(workExperienceId: number) {
    return this.httpClient.delete<WorkExperience>(this.url + "delete/" + workExperienceId);
  }
}
