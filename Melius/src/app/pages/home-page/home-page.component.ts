import {Component, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../../navigation/side-bar/side-bar.component";
import {UserRegistrationData} from "../../interfaces/user-registration-data";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SideBarComponent,
    NgIf,
    HomeNavbarComponent,
    NgOptimizedImage
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  registrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);

  constructor() {}

  ngOnInit(): void {
  }
}
