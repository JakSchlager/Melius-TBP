import {Component, inject, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../forms/login-form/login-form.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RegisterFormComponent} from "../../forms/register-form/register-form.component";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    NgClass,
    RegisterFormComponent
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent implements OnInit{
  isLoginClicked: boolean = false;
  isRegisterClicked: boolean = false;
  router: Router = inject(Router);

  ngOnInit() {
    if(localStorage.getItem("loggedInUser") !== null) {
      this.router.navigate(["/home"])
    }
  }

  clickedLogin() {
    this.isLoginClicked = true;
    this.isRegisterClicked = false;
  }

  clickedRegister() {
    this.isRegisterClicked = true;
    this.isLoginClicked = false;
  }
}
