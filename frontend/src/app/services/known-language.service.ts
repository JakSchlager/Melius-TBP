import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingKnowledge} from "../interfaces/ProgrammingKnowledge";
import {KnownLanguage} from "../interfaces/KnownLanguage";

@Injectable({
  providedIn: 'root'
})
export class KnownLanguageService {

  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/language";


  constructor() { }

  updateKnownLanguage(language: KnownLanguage) {
    return this.httpClient.put<KnownLanguage>(`${this.url}/update`, language);
  }

  getKnownLanguagesByProfileId(profileId: number) {
    return this.httpClient.get<KnownLanguage[]>(`${this.url}/get/${profileId}`);
  }

  deleteKnownLanguage(id: number) {
    return this.httpClient.delete<KnownLanguage>(`${this.url}/delete/${id}`);
  }
}
