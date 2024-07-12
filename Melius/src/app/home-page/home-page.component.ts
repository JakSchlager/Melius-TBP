import {Component, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../side-bar/side-bar.component";
import {UserRegistrationData} from "../interfaces/user-registration-data";
import {UserRegistrationLoginService} from "../services/user-registration-login.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SideBarComponent,
    NgIf
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
