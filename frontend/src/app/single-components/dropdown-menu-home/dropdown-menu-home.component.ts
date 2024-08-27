import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {NgClass, NgIf} from "@angular/common";
import {identity} from "rxjs";



@Component({
  selector: 'app-dropdown-menu-home',
  standalone: true,
  imports: [FormsModule, DropdownModule, NgIf, NgClass],
  templateUrl: './dropdown-menu-home.component.html',
  styleUrl: './dropdown-menu-home.component.css'
})
export class DropdownMenuHomeComponent{
  @Output() newFormAdded = new EventEmitter<void>();
  isOpen: boolean = false;
  isAnimating: boolean = false;

  toggleList() {
    if (this.isOpen) {
      this.isAnimating = true;
    }
    this.isOpen = !this.isOpen;
  }

  onAnimationEnd() {
    if(!this.isOpen){
      this.isAnimating = false;
    }
  }

  addCustomForm() {
    this.newFormAdded.emit()
  }
}
