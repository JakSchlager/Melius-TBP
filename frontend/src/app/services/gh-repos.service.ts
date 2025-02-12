import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Education} from "../interfaces/education";
import {GHRepo} from "../interfaces/GHRepo";

@Injectable({
  providedIn: 'root'
})
export class GhReposService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/ghRepos/";

  constructor() { }

  addAllRepos(repos: GHRepo[]) {
    return this.httpClient.post<GHRepo[]>(this.url + "addAll", repos);
  }

  deleteAllRepos(id: number) {
    return this.httpClient.delete<GHRepo[]>(this.url + "deleteAll/" + id);
  }
}
