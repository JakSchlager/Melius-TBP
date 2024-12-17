import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingKnowledge} from "../interfaces/ProgrammingKnowledge";
import {SoftwareKnowledge} from "../interfaces/SoftwareKnowledge";

@Injectable({
  providedIn: 'root'
})
export class SoftwareKnowledgeService {

  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/softw-knowledge";

  constructor() { }

  updateSoftwareKnowledge(softwareKnowledge: SoftwareKnowledge) {
    return this.httpClient.put<SoftwareKnowledge>(this.url + "/update", softwareKnowledge);
  }

  deleteSoftwareKnowledge(id: number) {
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }
}
