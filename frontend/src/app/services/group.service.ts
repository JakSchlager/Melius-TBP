import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GHRepo} from "../interfaces/GHRepo";
import {Group} from "../interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/groups/";

  constructor() { }

  getAllGroups() {
    return this.httpClient.get<Group[]>(`${this.url}getAll`);
  }

  createNewGroup(newGroup: Group) {
    return this.httpClient.post<Group>(`${this.url}`, newGroup);
  }

  getGroupById(id: number) {
    return this.httpClient.get<Group>(`${this.url}${id}`);
  }

  updateGroup(group: Group) {
    return this.httpClient.put<Group>(`${this.url}update`, group);
  }
}
