import {Component, inject} from '@angular/core';
import {GroupsPageComponent} from "../../../pages/groups-page/groups-page.component";
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-group-password-input-field',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './group-password-input-field.component.html',
  styleUrl: './group-password-input-field.component.css'
})
export class GroupPasswordInputFieldComponent {
  groupsPageComponent: GroupsPageComponent = inject(GroupsPageComponent);


  closePasswordField() {
    this.groupsPageComponent.showPasswordInputBox(false);
  }
}
