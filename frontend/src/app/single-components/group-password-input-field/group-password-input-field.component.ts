import {Component, inject} from '@angular/core';
import {GroupsPageComponent} from "../../pages/groups-page/groups-page.component";

@Component({
  selector: 'app-group-password-input-field',
  standalone: true,
  imports: [],
  templateUrl: './group-password-input-field.component.html',
  styleUrl: './group-password-input-field.component.css'
})
export class GroupPasswordInputFieldComponent {
  groupsPageComponent: GroupsPageComponent = inject(GroupsPageComponent);


  closePasswordField() {
    this.groupsPageComponent.showPasswordInputBox(false);
  }
}
