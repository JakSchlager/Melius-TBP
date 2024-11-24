import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HomePageServiceService} from "../../services/home-page-service.service";

@Component({
  selector: 'app-create-roles',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent implements OnInit {
  testRoles: string[] = []
  isOpen: boolean = false;
  isAnimating: boolean = false;

  ngOnInit(): void {
    this.testRoles = [
      "Administrator",
      "Mitarbeiter",
      "Scrum-Muster",
      "Project-Owner",
      "Frontend",
      "Backend",
      "DevOps"
    ]
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
    }
  }
}
