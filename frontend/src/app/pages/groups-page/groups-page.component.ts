import {Component, createComponent} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {CreateOwnGroupComponent} from "../groups_subpages/create-own-group/create-own-group.component";

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CreateOwnGroupComponent,
    NgIf,
    NgClass
  ],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent {
  createGroupBtnPressed: boolean = false;
  moveCreateForm !: string;

  createGroup() {
    this.createGroupBtnPressed = !this.createGroupBtnPressed;
  }

  closeCreateBtn() {
    this.createGroupBtnPressed = false;
  }
}
