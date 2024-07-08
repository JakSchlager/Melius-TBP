import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserRegistrationLoginService} from "../services/user-registration-login.service";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  registrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);

  saveForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),]),
  })


  onSave() {
    if (this.saveForm.valid) {
      this.registrationLoginService.handelUserRegistration(this.saveForm.value).subscribe({
        next: response => {
          console.log('User registered successfully.', response);
        },

        error: error => {
          console.log('Error during the registration process.', error);
        }
      })
    }
  }
}
