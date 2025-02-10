import {Component, inject, Inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group/group-avatar/group-avatar.component";
import {DropdownAvatarComponent} from "../../../single-components/home/user-avatar/dropdown-avatar.component";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Group} from "../../../interfaces/group";
import {TranslatePipe} from "@ngx-translate/core";
import {GroupService} from "../../../services/group.service";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [
    RouterLink,
    GroupAvatarComponent,
    ReactiveFormsModule,
    NgIf,
    TranslatePipe
  ],
  templateUrl: './create-own-group.component.html',
  styleUrl: './create-own-group.component.css'
})
export class CreateOwnGroupComponent {
  groupService: GroupService = inject(GroupService);
  profileService: ProfileService = inject(ProfileService);

  newGroupForm = new FormGroup({
    groupName: new FormControl<string>('', Validators.required),
    companyName: new FormControl<string>('', Validators.required),
    departmentName: new FormControl<string>('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    amountOfMembers: new FormControl<number>(0, Validators.compose([Validators.required, Validators.min(2)]))
  })


  onSubmit(): void {
    if (this.newGroupForm.valid) {
      const newGroup: Group = {
        id: 0,
        name: this.newGroupForm.controls.groupName.value || '',
        company: this.newGroupForm.controls.companyName.value || '',
        department: this.newGroupForm.controls.departmentName.value || '',
        password: this.newGroupForm.controls.password.value || '',
        maxMembers: this.newGroupForm.controls.amountOfMembers.value || 0,
        members: [this.profileService.loggedInUser!]
      }

      this.groupService.createNewGroup(newGroup).subscribe();

      this.reloadPage();
    }
  }



  constructor(@Inject(GroupsPageComponent) private groupsPage: GroupsPageComponent) {
  }

  closeCreationForm(): void {
    this.groupsPage.createGroupBtnPressed = false;
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }
}
