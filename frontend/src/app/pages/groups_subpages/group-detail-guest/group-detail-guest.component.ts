import {Component, inject, OnInit} from '@angular/core';
import {CreateRoleComponent} from "../../../single-components/group/create-roles/create-role.component";
import {FilterMembersComponent} from "../../../single-components/group/filter-members/filter-members.component";
import {GroupAvatarComponent} from "../../../single-components/group/group-avatar/group-avatar.component";
import {TranslatePipe} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {Group} from "../../../interfaces/group";
import {GroupService} from "../../../services/group.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-group-detail-admin',
  standalone: true,
  imports: [
    CreateRoleComponent,
    FilterMembersComponent,
    GroupAvatarComponent,
    TranslatePipe,
    NgForOf
  ],
  templateUrl: './group-detail-guest.component.html',
  styleUrl: './group-detail-guest.component.css'
})
export class GroupDetailGuestComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  group!: Group;
  groupService: GroupService = inject(GroupService);

  ngOnInit() {
    let id = Number(this.route.snapshot.params['id']);

    this.groupService.getGroupById(id).subscribe(g => {
      this.group = g;
    })
  }

  openPortfolio(url: string) {
    window.open(url, '_blank');
  }
}
