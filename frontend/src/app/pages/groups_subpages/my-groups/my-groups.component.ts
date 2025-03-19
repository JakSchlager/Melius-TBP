import {Component, Inject, inject, OnInit} from '@angular/core';
import {Group} from "../../../interfaces/group";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {ProfileService} from "../../../services/profile.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-my-groups',
  standalone: true,
  imports: [
    TranslatePipe,
    NgForOf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent  {
  profileService: ProfileService = inject(ProfileService);
  groups!: Group[];
  filteredGroups!: Group[];
  amountOfUserGroups : number = 0;
  searchQuery: string = '';

  constructor(@Inject(GroupsPageComponent) private groupPage: GroupsPageComponent) {
  }

  closeMyGroupsForm() {
    this.groupPage.myGroupsBtnPressed = false;
  }

  getAmountOfGroups() : number {
    this.amountOfUserGroups = this.profileService.loggedInUser!.groups?.length || 0;
    return this.amountOfUserGroups;
  }

  filterSearchResults() {
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
