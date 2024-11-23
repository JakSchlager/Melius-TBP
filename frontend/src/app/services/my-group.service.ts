import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile";
import {List} from "postcss/lib/list";
import {Member} from "../interfaces/group-member";

@Injectable({
  providedIn: 'root'
})
export class MyGroupService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly baseUrl: string | undefined;

  constructor() { }

  getAllMembers(): number {
    return 0;
  }
}
