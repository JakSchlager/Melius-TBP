import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TESTrolesService {
  groupRoles: string[] = [];
  onClickedRole: string = "";
  isListOpen: boolean = false;

  constructor() { }

  addRole(defaultRole: string) {
    this.groupRoles.push(defaultRole.trim());
  }

  roleClicked(role: string, openList: boolean) {
    this.onClickedRole = role;
    this.isListOpen = openList;
  }
}
