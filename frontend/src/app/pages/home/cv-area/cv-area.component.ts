import {Component, inject, OnInit} from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {FormArray, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DropdownMenuHomeComponent} from "../single-components/dropdown-menu-home/dropdown-menu-home.component";
import {GeneralInfoService} from "../../../services/general-info.service";
import {UserRegistrationLoginService} from "../../../services/user-registration-login.service";
import {UserRegistrationData} from "../../../interfaces/user-registration-data";
import {GeneralInfo} from "../../../interfaces/general-info";

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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.generalInfoService.loadGeneralInfo(this.userRegistrationLoginService.loggedInUser!).subscribe({
      next: (generalInfo: GeneralInfo) => {
        console.log(generalInfo);
        this.currGeneralInfo = generalInfo;
      }
    })
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

}
