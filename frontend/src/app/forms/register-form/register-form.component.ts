import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProfileService} from "../../services/profile.service";
import {Profile} from "../../interfaces/profile";
import {GeneralInfoService} from "../../services/general-info.service";
import {GeneralInfo} from "../../interfaces/general-info";
import {PortfolioService} from "../../services/portfolio.service";
import {Portfolio} from "../../interfaces/Portfolio";

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
  profileService: ProfileService = inject(ProfileService);
  generalInfoService: GeneralInfoService = inject(GeneralInfoService);
  portfolioService: PortfolioService = inject(PortfolioService);
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

      let newProfile: Profile = {
        id: 0,
        firstName: this.saveForm.controls['firstName'].value!,
        lastName: this.saveForm.controls['lastName'].value!,
        email: this.saveForm.controls['email'].value!,
        phoneNumber: this.saveForm.controls['phoneNumber'].value!,
        password: this.saveForm.controls['password'].value!
      }

      this.profileService.handelUserRegistration(newProfile).subscribe(p => {

        //this.profileService.loggedInUser = response;
        this.router.navigate(['/home']);
        localStorage.setItem("loggedInUser", JSON.stringify(p));
        console.log('Profile registered successfully.', p);

        let generalInfo: GeneralInfo = {
          id: 0,
          address: "",
          city: "",
          gender: "",
          zipCode: "",
        };

        this.generalInfoService.addGeneralInfo(generalInfo).subscribe(g => {
          let portfolio: Portfolio = {
            characteristics: [],
            educations: [],
            knownLanguages: [],
            programmingKnowledges: [],
            softwareKnowledges: [],
            workExperiences: [],
            profile: p,
            generalInfo: g
          }

          console.log(portfolio);

          this.portfolioService.addPortfolio(portfolio).subscribe()
        })


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
