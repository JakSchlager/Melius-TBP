import {Component, inject, OnInit} from '@angular/core';
import {CreateRoleComponent} from "../../../single-components/group/create-roles/create-role.component";
import {FilterMembersComponent} from "../../../single-components/group/filter-members/filter-members.component";
import {GroupAvatarComponent} from "../../../single-components/group/group-avatar/group-avatar.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Group} from "../../../interfaces/group";
import {GroupService} from "../../../services/group.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-group-detail-admin',
  standalone: true,
  imports: [
    CreateRoleComponent,
    FilterMembersComponent,
    GroupAvatarComponent,
    TranslatePipe,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  group!: Group;
  groupService: GroupService = inject(GroupService);
  isEditingForm: boolean = false;

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);

    this.groupService.getGroupById(id).subscribe(g => {
      this.group = g;
    })
  }

  openPortfolio(url: string) {
    window.open(url, '_blank');
  }

  updateGroupCredentials(groupToSave: Group) {
    this.isEditingForm = false;
  }

  editGroupForm() {
    this.isEditingForm = true;
  }
}
