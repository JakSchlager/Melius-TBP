import {Component, OnInit} from '@angular/core';
import {FormArray, FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";



@Component({
  selector: 'app-dropdown-menu-home',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './dropdown-menu-home.component.html',
  styleUrl: './dropdown-menu-home.component.css'
})
export class DropdownMenuHomeComponent{
}
