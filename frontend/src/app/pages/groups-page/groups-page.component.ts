import {Component, createComponent} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CreateOwnGroupComponent} from "../groups_subpages/create-own-group/create-own-group.component";

@Component({
  selector: 'app-groups-page',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    CreateOwnGroupComponent,
    NgIf
  ],
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.css'
})
export class GroupsPageComponent {
  createGroupBtnPressed: boolean = false;

  createGroup(): boolean {
    if (!this.createGroupBtnPressed) {
      this.createGroupBtnPressed = true;
      return this.createGroupBtnPressed;
    }

    else {
      this.createGroupBtnPressed = false;
      return this.createGroupBtnPressed;
    }
  }
}
