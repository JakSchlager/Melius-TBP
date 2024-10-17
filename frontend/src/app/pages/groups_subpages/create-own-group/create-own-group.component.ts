import {Component, inject, Inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group-avatar/group-avatar.component";
import {DropdownAvatarComponent} from "../../../single-components/user-avatar/dropdown-avatar.component";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";

@Component({
  selector: 'app-create-own-group',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    GroupAvatarComponent,
    DropdownAvatarComponent
  ],
  templateUrl: './create-own-group.component.html',
  styleUrl: './create-own-group.component.css'
})
export class CreateOwnGroupComponent {

  constructor(@Inject(GroupsPageComponent) private groupsPage: GroupsPageComponent) {
  }

  closeCreationForm(): void {
    this.groupsPage.createGroupBtnPressed = false;
  }
}
