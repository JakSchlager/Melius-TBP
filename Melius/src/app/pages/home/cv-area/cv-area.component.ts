import { Component } from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cv-area',
  standalone: true,
  imports: [
    HomeNavbarComponent,
    SideBarComponent,
    NgOptimizedImage
  ],
  templateUrl: './cv-area.component.html',
  styleUrl: './cv-area.component.css'
})
export class CvAreaComponent {

}
