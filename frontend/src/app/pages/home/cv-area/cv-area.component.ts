import {Component, inject, OnInit} from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {formatDate, NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {GeneralInfoService} from "../../../services/general-info.service";
import {UserRegistrationLoginService} from "../../../services/user-registration-login.service";
import {GeneralInfo} from "../../../interfaces/general-info";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";
import {Router} from "@angular/router";
import {Education} from "../../../interfaces/education";
import {EducationService} from "../../../services/education.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

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
  educationService: EducationService = inject(EducationService);
  currGeneralInfo: GeneralInfo | undefined;
  router: Router = inject(Router);

  generalInfoForm: FormGroup = new FormGroup({
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

      this.educationService.getEducationsByProfileId(this.userRegistrationLoginService.loggedInUser!.id).subscribe(v => {
        v = <Education[]> v.slice().sort((a: Education, b: Education) => {
          console.log(a.fromDate);
          return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
        });
        for(let currEducation of v) {
          this.addEducationInfo(currEducation);
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
    this.educationService.deleteEducation(this.educationFormItems.at(index).value.id).subscribe();

    this.educationFormItems.removeAt(index);
  }

  addEducationInfo(education?: Education) {
    if(education !== undefined) {
      this.educationFormItems.push(
        this.fb.group({
          id: education.id,
          educationalInst: education.name,
          eIdateFrom: formatDate(education.fromDate, 'yyyy-MM-dd', 'en') ,
          eIdateTo: formatDate(education.toDate, 'yyyy-MM-dd', 'en') ,
          eIFinished: education.finished
        })
      )
    }

    else {
      this.educationFormItems.push(
        this.fb.group({
          id: [""],
          educationalInst: [""],
          eIdateFrom: [""],
          eIdateTo: [""],
          eIFinished: [""]
        })
      )
    }

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

  updateEducation(formNumber: number) {
      let education: Education = {
        fromDate: new Date(this.educationFormItems.at(formNumber).value.eIdateFrom),
        finished: this.educationFormItems.at(formNumber).value.eIFinished,
        id: this.educationFormItems.at(formNumber).value.id,
        name: this.educationFormItems.at(formNumber).value.educationalInst,
        toDate: new Date(this.educationFormItems.at(formNumber).value.eIdateTo),
        profile: {
          id: this.userRegistrationLoginService.loggedInUser!.id,
          firstName: this.userRegistrationLoginService.loggedInUser!.firstName,
          lastName: this.userRegistrationLoginService.loggedInUser!.lastName,
          email: this.userRegistrationLoginService.loggedInUser!.email,
          phoneNumber: this.userRegistrationLoginService.loggedInUser!.phoneNumber,
          password: this.userRegistrationLoginService.loggedInUser!.password
        }
      }

      this.educationService.updateEducation(education).subscribe();

  }
}
