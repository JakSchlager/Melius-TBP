import {Component, createComponent, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CreateOwnGroupComponent} from "../groups_subpages/create-group-form/create-own-group.component";
import {MyGroupsComponent} from "../groups_subpages/my-groups/my-groups.component";
import {FormsModule} from "@angular/forms";
import {
  GroupPasswordInputFieldComponent
} from "../../single-components/group/group-password-input-field/group-password-input-field.component";
import {TranslatePipe} from "@ngx-translate/core";
import {GroupService} from "../../services/group.service";
import {Group} from "../../interfaces/group";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [
    CreateOwnGroupComponent,
    NgIf,
    NgClass,
    MyGroupsComponent,
    FormsModule,
    NgForOf,
    GroupPasswordInputFieldComponent,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent implements OnInit {
  @ViewChild('searchBox', { static: false }) searchBox!: ElementRef;
  profileService: ProfileService = inject(ProfileService);
  groupsService: GroupService = inject(GroupService)
  createGroupBtnPressed: boolean = false;
  myGroupsBtnPressed : boolean = false;
  isAnimating: boolean = false;
  groups!: Group[];
  filteredGroups!: Group[];
  activeGroup!: Group | null;

  isSearchBoxOpen: boolean = false;
  searchQuery: string = '';

  showPasswordLoginField: boolean = false;

  ngOnInit(): void {
    this.groupsService.getAllGroups().subscribe(g => {
      this.groups = g;
    })
  }

  openCreateGroupForm() {
    this.myGroupsBtnPressed = false;
    this.createGroupBtnPressed = !this.createGroupBtnPressed;
  }

  isMemberOfGroup(group: Group) {
    for(let currMember of group.members) {
      if(currMember.email === this.profileService.loggedInUser!.email) {
        return true;
      }
    }
    return false;
  }

  openMyGroupsList() {
    this.createGroupBtnPressed = false;
    this.myGroupsBtnPressed = !this.myGroupsBtnPressed;
  }

  toggleSearchBox(event: Event) {
    event.stopPropagation(); // Prevent click from bubbling to parent
    this.isSearchBoxOpen = true;
    this.isAnimating = true;
    this.filteredGroups = this.groups;
  }

  onAnimationEnd() {
    if(!this.isSearchBoxOpen){
      this.isAnimating = false;
    }
  }

  filterSearchResults() {
    this.filteredGroups = this.groups.filter(group =>
      group.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.searchBox && !this.searchBox.nativeElement.contains(target)) {
      this.isSearchBoxOpen = false;
    }
  }


  showPasswordInputBox(toggle: boolean, group?: Group) {
    this.showPasswordLoginField = toggle;
    this.activeGroup = group || null;
  }
}
