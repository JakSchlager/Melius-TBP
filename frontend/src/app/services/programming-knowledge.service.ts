import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProgrammingKnowledge} from "../interfaces/ProgrammingKnowledge";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgrammingKnowledgeService {

  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/progr-knowledge";

  constructor() { }

  updateProgrammingLanguage(programmingKnowledge: ProgrammingKnowledge) {
    return this.httpClient.put<ProgrammingKnowledge>(this.url + "/update", programmingKnowledge);
  }

  deleteProgrammingKnowledge(id: number) {
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }
}
