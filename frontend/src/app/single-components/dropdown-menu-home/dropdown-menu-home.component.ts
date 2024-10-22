import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormArray, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {NgClass, NgIf} from "@angular/common";
import {identity} from "rxjs";
import {HomePageServiceService} from "../../services/home-page-service.service";



@Component({
  selector: 'app-dropdown-menu-home',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgIf, NgClass, ReactiveFormsModule],
  templateUrl: './dropdown-menu-home.component.html',
  styleUrl: './dropdown-menu-home.component.css'
})
export class DropdownMenuHomeComponent{
  @Output() newFormAdded = new EventEmitter<void>();
  isOpen: boolean = false;
  isAnimating: boolean = false;
  homePageService : HomePageServiceService = inject(HomePageServiceService);

  toggleList() {
    if (this.isOpen) {
      this.isAnimating = true;
    }
    this.isOpen = !this.isOpen;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
      this.homePageService.changeBoxDrag(false);
    }
  }

  isDaDChecked(event: any) {
    if (event.target.checked) {
      this.homePageService.changeBoxDrag(true);
    }
    else {
      this.homePageService.changeBoxDrag(false);
    }
  }
}
