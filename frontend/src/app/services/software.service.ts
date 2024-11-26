import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Selectable} from "../interfaces/Selectable";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/software/";

  constructor() { }

  loadAllProgrammingLanguages() {
    return this.httpClient.get<Selectable[]>(this.url + "get")
      .pipe(
        map(s => {
          let softwares: Selectable[] = [];

          for (const currSoftware of s) {
            softwares.push({
              id: currSoftware.id,
              label: currSoftware.label,
              value: currSoftware.value,
            })
          }

          return softwares;
        })
      )
  }
}
