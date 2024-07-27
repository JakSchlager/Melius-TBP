import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";
import {UserLoginData} from "../../interfaces/user-login-data";
import {UserRegistrationData} from "../../interfaces/user-registration-data";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  registrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);

  saveForm = new FormGroup( {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [])
  })

  onLogin() {
    const loginData: UserLoginData = {
      email: this.saveForm.controls['email'].value || '',
      password: this.saveForm.controls['password'].value || ''
    };

    this.registrationLoginService.handleUserLogin(loginData).subscribe({
      next: (userInfo: UserRegistrationData) => {
        this.saveForm.valid
        this.registrationLoginService.loggedInUser = userInfo;
        console.log('User logged in successfully', userInfo);
      },

      error: error => {
        !this.saveForm.valid
        console.log('Error during the login process.', error);
      }
    });
  }
}
