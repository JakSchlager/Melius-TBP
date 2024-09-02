import {Component, inject, OnInit} from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {GeneralInfoService} from "../../../services/general-info.service";
import {UserRegistrationLoginService} from "../../../services/user-registration-login.service";
import {GeneralInfo} from "../../../interfaces/general-info";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cv-area',
  standalone: true,
  imports: [
    HomeNavbarComponent,
    SideBarComponent,
    NgOptimizedImage,
    MatDateRangeInput,
    ReactiveFormsModule,
    NgForOf,
    MatIcon,
    DropdownMenuHomeComponent
  ],
  templateUrl: './cv-area.component.html',
  styleUrl: './cv-area.component.css'
})
export class CvAreaComponent implements OnInit{
  generalInfoService: GeneralInfoService = inject(GeneralInfoService);
  userRegistrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);
  currGeneralInfo: GeneralInfo | undefined;
  router: Router = inject(Router);

  generalInfoForm = new FormGroup({
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    setTimeout(() => {
      this.generalInfoService.loadGeneralInfo(this.userRegistrationLoginService.loggedInUser!).subscribe({
        next: (generalInfo: GeneralInfo) => {
          this.currGeneralInfo = generalInfo;

          this.generalInfoForm.controls['gender'].setValue(this.currGeneralInfo.gender);
          this.generalInfoForm.controls['firstName'].setValue(this.currGeneralInfo.profile.firstName);
          this.generalInfoForm.controls['lastName'].setValue(this.currGeneralInfo.profile.lastName);
          this.generalInfoForm.controls['email'].setValue(this.currGeneralInfo.profile.email);
          this.generalInfoForm.controls['phoneNumber'].setValue(this.currGeneralInfo.profile.phoneNumber);
          this.generalInfoForm.controls['zipCode'].setValue(this.currGeneralInfo.zipCode);
          this.generalInfoForm.controls['city'].setValue(this.currGeneralInfo.city);
          this.generalInfoForm.controls['address'].setValue(this.currGeneralInfo.address);

        }
      })
    }, 100);

  }


  //Ausbildungen
  educationForm = this.fb.group({
    educationFormItems: this.fb.array([])
  });

  get educationFormItems() {
    return this.educationForm.get('educationFormItems') as FormArray;
  }

  deleteEducationInfo(index: number) {
    this.educationFormItems.removeAt(index);
  }

  addEducationInfo() {
    this.educationFormItems.push(
      this.fb.group({
        educationalInst: [''],
        eIdateFrom: [''],
        eIdateTo: [''],
        eIFinished: ['']
      })
    )
  }


  //Berufserfahrungen
  jobExperiencesForm = this.fb.group({
    jobExperiencesFormItems: this.fb.array([])
  });

  get jobExperiencesFormItems() {
    return this.jobExperiencesForm.get('jobExperiencesFormItems') as FormArray;
  }

  deleteJobExperiencesInfo(index: number) {
    this.jobExperiencesFormItems.removeAt(index);
  }

  addJobExperiencesInfo() {
    this.jobExperiencesFormItems.push(
      this.fb.group({
        companyName: [''],
        workFrom: [''],
        workTo: [''],
        moreInfo: ['']
      })
    )
  }

  updateGeneralInfo() {
    let newGeneralInfo: GeneralInfo = {
      address: this.generalInfoForm!.controls["address"].value!,
      city: this.generalInfoForm!.controls["city"].value!,
      gender: this.generalInfoForm!.controls["gender"].value!,
      profile: {
        id: this.userRegistrationLoginService.loggedInUser!.id,
        firstName: this.generalInfoForm!.controls["firstName"].value!,
        lastName: this.generalInfoForm!.controls["lastName"].value!,
        email: this.generalInfoForm!.controls["email"].value!,
        phoneNumber: this.generalInfoForm!.controls["phoneNumber"].value!,
        password: this.userRegistrationLoginService.loggedInUser!.password
      },
      zipCode: this.generalInfoForm!.controls["zipCode"].value!
    }

    this.generalInfoService.updateGeneralInfo(newGeneralInfo).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true});
    }, 100);
  }
}
