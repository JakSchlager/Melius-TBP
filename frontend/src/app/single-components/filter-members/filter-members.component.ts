import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-filter-members',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './filter-members.component.html',
  styleUrl: './filter-members.component.css'
})
export class FilterMembersComponent {
  isAnimating: boolean = false;
  isOpen: boolean = false;

  toggleFilterMenu() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
    }
  }

  filterMembers() {

  }
}
