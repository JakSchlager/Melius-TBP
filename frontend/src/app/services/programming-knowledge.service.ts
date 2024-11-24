import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WorkExperience} from "../interfaces/work-experience";
import {Selectable} from "../interfaces/Selectable";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgrammingKnowledgeService {

  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/programming/";

  constructor() { }

  loadAllProgrammingKnowledges() {
    return this.httpClient.get<Selectable[]>(this.url + "get")
      .pipe(
        map(p => {
          let programmings: Selectable[] = [];

          for (const currProgramming of p) {
            programmings.push({
              id: currProgramming.id,
              label: currProgramming.label,
              value: currProgramming.value,
            })
          }

          return programmings;
        })
      )
  }
}
