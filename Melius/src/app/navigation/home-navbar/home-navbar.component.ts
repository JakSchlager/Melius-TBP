import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  lifeMarked!: string
  clicked : boolean = false;
  projectsMarked!: string
  strengthsMarked!: string

  onLifePage() {
    this.clicked = true;

    if (this.clicked) {
      this.lifeMarked = 'border-b-2 border-primary-color';
    }
  }

  onProjects() {
    this.lifeMarked = '';
    this.projectsMarked = 'border-b-2 border-primary-color';
    this.strengthsMarked = '';
  }

  onStrengths() {
    this.lifeMarked = '';
    this.projectsMarked = '';
    this.strengthsMarked = 'border-b-2 border-primary-color';
  }
}
