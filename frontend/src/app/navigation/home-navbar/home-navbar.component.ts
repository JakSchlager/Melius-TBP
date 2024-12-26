import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLinkActive,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
}
