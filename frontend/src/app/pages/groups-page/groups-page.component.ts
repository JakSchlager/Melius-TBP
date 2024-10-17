import {Component, createComponent} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {CreateOwnGroupComponent} from "../groups_subpages/create-own-group/create-own-group.component";
import {MyGroupsComponent} from "../groups_subpages/my-groups/my-groups.component";

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CreateOwnGroupComponent,
    NgIf,
    NgClass,
    MyGroupsComponent
  ],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent {
  createGroupBtnPressed: boolean = false;
  myGroupsBtnPressed : boolean = false;
  moveCreateForm !: string;

  openCreateGroupForm() {
    this.myGroupsBtnPressed = false;
    this.createGroupBtnPressed = !this.createGroupBtnPressed;
  }


  openMyGroupsList() {
    this.createGroupBtnPressed = false;
    this.myGroupsBtnPressed = !this.myGroupsBtnPressed;
  }

}
