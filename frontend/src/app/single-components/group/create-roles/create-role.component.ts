import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HomePageServiceService} from "../../../services/home-page-service.service";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-create-roles',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.css'
})
export class CreateRoleComponent implements OnInit {
  createdRoles: string[] = [];
  newRoleInput: string = '';
  isOpen: boolean = false;
  isAnimating: boolean = false;
  isListEmpty: string | undefined;

  ngOnInit(): void {
    if (this.createdRoles.length > 0) {
      this.isListEmpty = 'bg-white rounded-lg shadow-lg';
    }

    else {
      this.isListEmpty = 'bg-none';
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isAnimating = true;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
    }
  }

  addRole(): void {
    if (this.newRoleInput.trim() != '') {
      this.createdRoles.push(this.newRoleInput.trim());
      this.isListEmpty = 'bg-white rounded-lg shadow-lg';
      this.newRoleInput = '';
    }
  }

  removeRoleFromList(currRoleIndex: number): void {
    this.createdRoles.splice(currRoleIndex, 1);

    if (this.createdRoles.length == 0) {
      this.isListEmpty = 'bg-none';
    }
  }
}
