import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";
import {GeneralInfoService} from "../../services/general-info.service";
import {GeneralInfo} from "../../interfaces/general-info";

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
  registrationLoginService: UserService = inject(UserService);
  generalInfoService: GeneralInfoService = inject(GeneralInfoService);
  router: Router = inject(Router);

  saveForm = new FormGroup( {
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),]),
    confirmPassword: new FormControl<string>('', Validators.required),
    termsAndServiceBox: new FormControl<boolean>(false, Validators.requiredTrue),
  }, { validators: this.checkPasswordMatch() });


  onRegister() {
    this.saveForm.markAllAsTouched();
    if (this.saveForm.valid) {

      const newUser: User = {
        id: 0,
        firstName: this.saveForm.controls['firstName']?.value || '',
        lastName: this.saveForm.controls['lastName'].value  || '',
        email: this.saveForm.controls['email'].value || '',
        phoneNumber: this.saveForm.controls['phoneNumber'].value || '',
        password: this.saveForm.controls['password'].value || '',
        githubUsername: ''
      }


      this.registrationLoginService.handelUserRegistration(newUser).subscribe({
        next: (response: User) => {
          //this.registrationLoginService.loggedInUser = response;
          this.router.navigate(['/home']);
          localStorage.setItem("loggedInUser", JSON.stringify(response));
          console.log('User registered successfully.', response);

          const generalInfo: GeneralInfo = {
            address: "",
            city: "",
            gender: "",
            zipCode: "",
            user: response
          };

          this.generalInfoService.addGeneralInfo(generalInfo).subscribe({
            next: (response: GeneralInfo) => {
              console.log(response)
            },
            error: error => {
              console.log("nicht funktinoeirt")
            }
          })
        },

        error: error => {
          document.getElementById("registration_error")!.innerHTML = "Ein Account mit dieser Email existiert bereits!";
          console.log('Error during the registration process.', error);
        }
      });


    }
  }

  checkPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
          return { 'passwordDoesNotMatch': true }
        }

        return null;
    };
  }


}
