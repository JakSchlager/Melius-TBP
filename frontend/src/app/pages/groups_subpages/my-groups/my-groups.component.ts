import {Component, Inject, inject, OnInit} from '@angular/core';
import {Group} from "../../../interfaces/group";
import {GroupPageService} from "../../../services/group-page.service";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent  {

  amountOfUserGroups : number = 0;

  constructor(@Inject(GroupPageService) private groupService: GroupPageService, @Inject(GroupsPageComponent) private groupPage: GroupsPageComponent) {
  }

  closeMyGroupsForm() {
    this.groupPage.myGroupsBtnPressed = false;
  }

  getAmountOfGroups() : number {
    this.amountOfUserGroups = this.groupService.getUserGroups();
    return this.amountOfUserGroups;
  }
}
