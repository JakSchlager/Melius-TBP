import { Component } from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {FormArray, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";

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
export class CvAreaComponent {

  constructor(private fb: FormBuilder) {}


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
