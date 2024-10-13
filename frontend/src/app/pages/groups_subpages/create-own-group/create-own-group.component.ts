import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-create-own-group',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './create-own-group.component.html',
  styleUrl: './create-own-group.component.css'
})
export class CreateOwnGroupComponent {

}
