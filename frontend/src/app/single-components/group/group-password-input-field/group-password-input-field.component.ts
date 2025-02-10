import {Component, inject, Input} from '@angular/core';
import {GroupsPageComponent} from "../../../pages/groups-page/groups-page.component";
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {Group} from "../../../interfaces/group";
import {FormsModule} from "@angular/forms";
import {ProfileService} from "../../../services/profile.service";
import {GroupService} from "../../../services/group.service";

@Component({
  selector: 'app-group-password-input-field',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './group-password-input-field.component.html',
  styleUrl: './group-password-input-field.component.css'
})
export class GroupPasswordInputFieldComponent {
  profileService: ProfileService = inject(ProfileService);
  groupService: GroupService = inject(GroupService);
  groupsPageComponent: GroupsPageComponent = inject(GroupsPageComponent);
  router: Router = inject(Router)
  passwortdInput!: string;

  @Input() group!: Group;


  closePasswordField() {
    this.groupsPageComponent.showPasswordInputBox(false);
  }

  checkPassword() {
    if(this.passwortdInput === this.group.password) {
      this.group.members.push(this.profileService.loggedInUser!)

      this.groupService.updateGroup(this.group).subscribe(
        next => {
          this.router.navigateByUrl(`/groups/${this.group.id}`);
        }
      )
    }
  }
}
