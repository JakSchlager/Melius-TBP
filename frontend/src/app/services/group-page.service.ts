import { Injectable } from '@angular/core';
import {Group} from "../interfaces/group";

@Injectable({
  providedIn: 'root'
})
export class GroupPageService {
  amountOfUserGroups : Group[] = [];

  constructor() { }

  getUserGroups (): number {
    return 0;
  }
}
