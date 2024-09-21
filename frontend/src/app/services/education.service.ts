import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Education} from "../interfaces/education";

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/education/";

  constructor() { }

  updateEducation(education: Education) {
    console.log(education)
    return this.httpClient.post<Education>(this.url + "update", education);
  }

  getEducationsByProfileId(profileId: number) {
    return this.httpClient.get<Education[]>(this.url + "get/" + profileId);
  }

  deleteEducation(educationId: number) {
    return this.httpClient.delete<Education>(this.url + "delete/" + educationId);
  }
}
