import {Component, inject, Inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group-avatar/group-avatar.component";
import {DropdownAvatarComponent} from "../../../single-components/user-avatar/dropdown-avatar.component";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    GroupAvatarComponent,
    DropdownAvatarComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-own-group.component.html',
  styleUrl: './create-own-group.component.css'
})
export class CreateOwnGroupComponent {

  newGroupForm = new FormGroup({
    groupName: new FormControl<string>('', Validators.required),
  })

  constructor(@Inject(GroupsPageComponent) private groupsPage: GroupsPageComponent) {
  }

  closeCreationForm(): void {
    this.groupsPage.createGroupBtnPressed = false;
  }
}
