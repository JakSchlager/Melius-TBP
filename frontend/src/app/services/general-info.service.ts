import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeneralInfo} from "../interfaces/general-info";
import {UserRegistrationLoginService} from "./user-registration-login.service";
import {UserRegistrationData} from "../interfaces/user-registration-data";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/info/";
  constructor() { }

  addGeneralInfo(generalInfo: GeneralInfo): Observable<GeneralInfo> {
    let generalInfoResponse = this.httpClient.post<GeneralInfo>(this.url+"add", generalInfo)

    if(generalInfoResponse != null) {
      return generalInfoResponse;
    } else {
      throw new Error("Error while creating General Info in Database");
    }
  }

  loadGeneralInfo(profile: UserRegistrationData): Observable<GeneralInfo> {
    return this.httpClient.get<GeneralInfo>(this.url + "get/" + profile.id);
  }
}
