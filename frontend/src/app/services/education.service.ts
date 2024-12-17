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
    return this.httpClient.put<Education>(this.url + "update", education);
  }

  deleteEducation(educationId: number) {
    return this.httpClient.delete<Education>(this.url + "delete/" + educationId);
  }
}
