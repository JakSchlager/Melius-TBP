import {Component, inject} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group/group-avatar/group-avatar.component";
import {GroupPageService} from "../../../services/group-page.service";
import {MyGroupService} from "../../../services/my-group.service";
import {FilterMembersComponent} from "../../../single-components/group/filter-members/filter-members.component";
import {CreateRoleComponent} from "../../../single-components/group/create-roles/create-role.component";

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
