import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
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
  router: Router = inject(Router);

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
        this.registrationLoginService.loggedInUser = userInfo;
        this.router.navigate(['/home']);
        console.log('User logged in successfully', userInfo);
      },

      error: error => {
        document.getElementById("login_error")!.innerHTML = "Email oder Passwort falsch!";
        console.log('Error during the login process.', error);
      }
    });
  }
}
