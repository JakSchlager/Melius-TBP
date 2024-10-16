import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeneralInfo} from "../interfaces/general-info";
import {ProfileService} from "./profile.service";
import {Profile} from "../interfaces/profile";
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

  loadGeneralInfo(profile: Profile): Observable<GeneralInfo> {
    return this.httpClient.get<GeneralInfo>(this.url + "get/" + profile.id);
  }

  updateGeneralInfo(newGeneralInfo: GeneralInfo) {
    return this.httpClient.put<GeneralInfo>(this.url + "update", newGeneralInfo);
  }
}
