import {Component, Inject, inject, Input, OnInit} from '@angular/core';
import {Group} from "../../../interfaces/group";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {ProfileService} from "../../../services/profile.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent  {
  @Input() groups: Group[] | undefined;

  profileService: ProfileService = inject(ProfileService);

  amountOfUserGroups : number = 0;

  constructor(@Inject(GroupsPageComponent) private groupPage: GroupsPageComponent) {
  }

  closeMyGroupsForm() {
    this.groupPage.myGroupsBtnPressed = false;
  }

  getAmountOfGroups() : number {
    this.amountOfUserGroups = this.groups!.length || 0;
    return this.amountOfUserGroups;
  }

  getProfileGroups() {
    return this.groups?.filter(group => {
      for(let member of group.members) {
        if(member.id === this.profileService.loggedInUser!.id) {
          return true;
        }
      }
      return false;
    })
  }
}
