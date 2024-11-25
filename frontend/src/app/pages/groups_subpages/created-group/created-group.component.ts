import {Component, inject} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group-avatar/group-avatar.component";
import {GroupPageService} from "../../../services/group-page.service";
import {MyGroupService} from "../../../services/my-group.service";
import {FilterMembersComponent} from "../../../single-components/filter-members/filter-members.component";
import {CreateRoleComponent} from "../../../single-components/create-roles/create-role.component";

@Component({
  selector: 'app-created-group',
  standalone: true,
  imports: [
    NgOptimizedImage,
    GroupAvatarComponent,
    NgIf,
    FilterMembersComponent,
    CreateRoleComponent
  ],
  templateUrl: './created-group.component.html',
  styleUrl: './created-group.component.css'
})
export class CreatedGroupComponent {
  myGroupService: MyGroupService = inject(MyGroupService);
}
