import {inject, Injectable} from '@angular/core';
import {Group} from "../interfaces/group";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupPageService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl: string  = "";
  amountOfUserGroups : Group[] = [];


  constructor() { }


  // My Groups
  //TODO: endpoint wird noch benötigt
  getFromUserCreatedGroups (): number {
    return 0;
  }


  // Create new Group
  createNewGroup (group: Group): Observable<Group> {
    //TODO: endpoint wird noch benötigt
    return this.httpClient.post<Group>(`${this.baseUrl}/groups`, group);
  }


  // Already created Group
  //TODO: endpoint wird noch benötigt
  getAllGroups(): number {
    return 0;
  }
}
