import {Component, inject, Inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group-avatar/group-avatar.component";
import {DropdownAvatarComponent} from "../../../single-components/user-avatar/dropdown-avatar.component";
import {GroupsPageComponent} from "../../groups-page/groups-page.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Group} from "../../../interfaces/group";
import {GroupPageService} from "../../../services/group-page.service";

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [
    RouterLink,
    GroupAvatarComponent,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './create-own-group.component.html',
  styleUrl: './create-own-group.component.css'
})
export class CreateOwnGroupComponent {
  groupService: GroupPageService = inject(GroupPageService);
  isAvailable : string | undefined;

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
        groupName: this.newGroupForm.controls.groupName.value || '',
        company: this.newGroupForm.controls.companyName.value || '',
        department: this.newGroupForm.controls.departmentName.value || '',
        releaseDate: new Date(),
        amountOfEMPs: this.newGroupForm.controls.amountOfMembers.value || 0
      }

      //TODO: richtige Rückmeldung an den User geben!
      this.groupService.createNewGroup(newGroup).subscribe(
        () => {
          console.log("Gruppe wurde erfolgreich erstellt!", newGroup)
        },
        error => {
          console.log("Gruppe konnte NICHT erstellt werden!");
        }
      );
    }
  }



  constructor(@Inject(GroupsPageComponent) private groupsPage: GroupsPageComponent) {
  }

  closeCreationForm(): void {
    this.groupsPage.createGroupBtnPressed = false;
  }
}
