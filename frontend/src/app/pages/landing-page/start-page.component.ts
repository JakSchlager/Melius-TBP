import {Component, inject, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../forms/login-form/login-form.component";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RegisterFormComponent} from "../../forms/register-form/register-form.component";
import {Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    FormsModule,
    NgClass,
    RegisterFormComponent,
    TranslatePipe
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent implements OnInit{
  isLoginClicked: boolean = false;
  isRegisterClicked: boolean = false;
  router: Router = inject(Router);

  ngOnInit() {
    if(localStorage.getItem("loggedInUser") !== null || sessionStorage.getItem("loggedInUser") !== null) {
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
