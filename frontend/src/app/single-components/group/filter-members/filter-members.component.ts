import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-filter-members',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './filter-members.component.html',
  styleUrl: './filter-members.component.css'
})
export class FilterMembersComponent {
  isAnimating: boolean = false;
  isOpen: boolean = false;

  toggleFilterMenu() {
    this.isOpen = !this.isOpen;
    this.isAnimating = true;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
    }
  }

  filterMembers() {

  }
}
