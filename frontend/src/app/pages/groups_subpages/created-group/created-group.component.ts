import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {GroupAvatarComponent} from "../../../single-components/group-avatar/group-avatar.component";

@Component({
  selector: 'app-created-group',
  standalone: true,
  imports: [
    NgOptimizedImage,
    GroupAvatarComponent
  ],
  templateUrl: './created-group.component.html',
  styleUrl: './created-group.component.css'
})
export class CreatedGroupComponent {

}
