import {Component, createComponent, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {CreateOwnGroupComponent} from "../groups_subpages/create-group-form/create-own-group.component";
import {MyGroupsComponent} from "../groups_subpages/my-groups/my-groups.component";
import {FormsModule} from "@angular/forms";
import {GroupPageService} from "../../services/group-page.service";

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CreateOwnGroupComponent,
    NgIf,
    NgClass,
    MyGroupsComponent,
    FormsModule,
    NgForOf
  ],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent {
  @ViewChild('searchBox', { static: false }) searchBox!: ElementRef;
  groupsService: GroupPageService = inject(GroupPageService)
  createGroupBtnPressed: boolean = false;
  myGroupsBtnPressed : boolean = false;
  isAnimating: boolean = false;
  amtOfAllGroups: number = 0;

  isSearchBoxOpen: boolean = false;
  searchQuery: string = '';
  testGroups: string[] = ['Frontend Devs', 'Free People', 'Frontend Heros', 'Backend Gurus', 'UX Designers', 'Scrum Masters', 'Project Owners', 'MEDT Maturanten', 'Group Tester'];
  filteredGroups: string[] = [];

  openCreateGroupForm() {
    this.myGroupsBtnPressed = false;
    this.createGroupBtnPressed = !this.createGroupBtnPressed;
  }


  openMyGroupsList() {
    this.createGroupBtnPressed = false;
    this.myGroupsBtnPressed = !this.myGroupsBtnPressed;
  }

  toggleSearchBox(event: Event) {
    event.stopPropagation(); // Prevent click from bubbling to parent
    this.isSearchBoxOpen = true;
    this.filteredGroups = this.testGroups; // Show all groups initially
  }

  onAnimationEnd() {
    if(!this.isSearchBoxOpen){
      this.isAnimating = false;
    }
  }

  filterSearchResults() {
    this.filteredGroups = this.testGroups.filter(group =>
      group.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (this.searchBox && !this.searchBox.nativeElement.contains(target)) {
      this.isSearchBoxOpen = false;
    }
  }


  // Für später wenn der endpoint vorhanden ist
  getAllGroups(): number {
    this.amtOfAllGroups = this.groupsService.getAllGroups();
    return this.amtOfAllGroups;
  }

}
