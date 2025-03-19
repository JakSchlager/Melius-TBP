import {Component, Inject, inject, Input, OnInit} from '@angular/core';
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
    FormsModule,
    NgIf
  ],
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.css'
})
export class MyGroupsComponent implements OnInit {
  @Input() groups: Group[] | undefined;
  profileService: ProfileService = inject(ProfileService);
  amountOfUserGroups : number = 0;
  searchQuery: string = '';
  filteredGroups: Group[] = [];
  allUserGroups: Group[] | undefined = [];

  constructor(@Inject(GroupsPageComponent) private groupPage: GroupsPageComponent) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.filteredGroups = this.getProfileGroups(this.groups!)
    }, 500)
  }

  closeMyGroupsForm() {
    this.groupPage.myGroupsBtnPressed = false;
  }

  filterSearchResults() {
    this.filteredGroups = this.getProfileGroups(this.groups!).filter(group =>
      group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getProfileGroups(groups: Group[]) {
    return groups.filter(group => {
      for(let member of group.members) {
        if(member.id === this.profileService.loggedInUser!.id) {
          return true;
        }
      }
      return false;
    })
  }
}
