import {Component, inject, OnInit} from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {formatDate, NgForOf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {GeneralInfoService} from "../../../services/general-info.service";
import {ProfileService} from "../../../services/profile.service";
import {GeneralInfo} from "../../../interfaces/general-info";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";
import {Router} from "@angular/router";
import {Education} from "../../../interfaces/education";
import {EducationService} from "../../../services/education.service";
import {WorkExperience} from "../../../interfaces/work-experience";
import {WorkExperienceService} from "../../../services/work-experience.service";

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
  profileService: ProfileService = inject(ProfileService);
  educationService: EducationService = inject(EducationService);
  workExperienceService: WorkExperienceService = inject(WorkExperienceService);
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
      this.generalInfoService.loadGeneralInfo(this.profileService.loggedInUser!).subscribe({
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

      this.educationService.getEducationsByProfileId(this.profileService.loggedInUser!.id).subscribe(v => {
        v = <Education[]> v.slice().sort((a: Education, b: Education) => {
          return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
        });
        for(let currEducation of v) {
          this.addEducationInfo(currEducation);
        }
      })

      this.workExperienceService.getWorkExperiencesByProfileId(this.profileService.loggedInUser!.id).subscribe(v => {
        v = <WorkExperience[]> v.slice().sort((a: WorkExperience, b: WorkExperience) => {
          return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
        });
        for(let currWorkExperience of v) {
          this.addJobExperiencesInfo(currWorkExperience);
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
    this.workExperienceService.deleteWorkExperience(this.jobExperiencesFormItems.at(index).value.id).subscribe();

    this.jobExperiencesFormItems.removeAt(index);
  }

  addJobExperiencesInfo(workExperience?: WorkExperience) {
    if(workExperience !== undefined) {
      this.jobExperiencesFormItems.push(
        this.fb.group({
          id: workExperience.id,
          companyName: workExperience.company,
          workFrom: formatDate(workExperience.fromDate, 'yyyy-MM-dd', 'en'),
          workTo: formatDate(workExperience.toDate, 'yyyy-MM-dd', 'en'),
          moreInfo: workExperience.information
        })
      )
    } else {
      this.jobExperiencesFormItems.push(
        this.fb.group({
          id: [''],
          companyName: [''],
          workFrom: [''],
          workTo: [''],
          moreInfo: ['']
        })
      )
    }
  }

  updateGeneralInfo() {
    let profile = this.profileService.loggedInUser;

    profile!.firstName = this.generalInfoForm!.controls["firstName"].value!
    profile!.lastName = this.generalInfoForm!.controls["lastName"].value!
    profile!.email = this.generalInfoForm!.controls["email"].value!
    profile!.phoneNumber = this.generalInfoForm!.controls["phoneNumber"].value!

    let newGeneralInfo: GeneralInfo = {
      address: this.generalInfoForm!.controls["address"].value!,
      city: this.generalInfoForm!.controls["city"].value!,
      gender: this.generalInfoForm!.controls["gender"].value!,
      profile: profile!,
      zipCode: this.generalInfoForm!.controls["zipCode"].value!
    }

    this.generalInfoService.updateGeneralInfo(newGeneralInfo).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['/home/cv']);
      });
    }, 100);
  }

  updateEducation(formNumber: number) {
      let education: Education = {
        fromDate: new Date(this.educationFormItems.at(formNumber).value.eIdateFrom),
        finished: this.educationFormItems.at(formNumber).value.eIFinished,
        id: this.educationFormItems.at(formNumber).value.id,
        name: this.educationFormItems.at(formNumber).value.educationalInst,
        toDate: new Date(this.educationFormItems.at(formNumber).value.eIdateTo),
        profile: this.profileService.loggedInUser!
      }

      this.educationService.updateEducation(education).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['/home/cv']);
      });
    }, 100);

  }

  updateWorkExperience(formNumber: number) {
    let workExperience: WorkExperience = {
      id: this.jobExperiencesFormItems.at(formNumber).value.id,
      fromDate: new Date(this.jobExperiencesFormItems.at(formNumber).value.workFrom),
      toDate: new Date(this.jobExperiencesFormItems.at(formNumber).value.workTo),
      company: this.jobExperiencesFormItems.at(formNumber).value.companyName,
      information: this.jobExperiencesFormItems.at(formNumber).value.moreInfo,
      profile: this.profileService.loggedInUser!
    }

    this.workExperienceService.updateWorkExperience(workExperience).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['/home/cv']);
      });

      this.newSavingNotification('Berufserfahrungen')
    }, 100);
  }


  // Drag and Drop functionality

  draggedItem: any;

  // Wird ausgelöst, wenn das Ziehen beginnt
  onDragStart(event: DragEvent, item: any) {
    this.draggedItem = item;
    event.dataTransfer?.setData('text/plain', event.target?.toString() || '');
  }

  // Wird ausgelöst, wenn das Element über ein gültiges Drop-Ziel gezogen wird
  onDragOver(event: DragEvent) {
    event.preventDefault(); // Muss aufgerufen werden, damit ein Drop möglich ist
  }

  // Wird ausgelöst, wenn das Element fallen gelassen wird
  onDrop(event: DragEvent, targetContainerId: string) {
    event.preventDefault();
    const targetElement = document.getElementById(targetContainerId);
    if (targetElement && this.draggedItem) {
      // Füge das gezogene Element dem Ziel hinzu
      targetElement.appendChild(this.draggedItem);
      this.draggedItem = null;
    }
  }


  // Saving Notification
  notifications: { message: string, fade: boolean }[] = [];

  newSavingNotification(formName : string) {
    const newNotification = { message: `${formName} wurde erfolgreich gespeichert!`, fade: false };
    this.notifications.push(newNotification);

    // Automatisches Entfernen nach 3 Sekunden mit "smooth fading"
    setTimeout(() => {
      newNotification.fade = true;  // Füge die Fade-Klasse hinzu, um das Verblassen zu starten
    }, 3000);
  }

  removeNotification(index: number) {
    // Wenn die Animation beendet ist, entferne die Benachrichtigung aus der Liste
    this.notifications.splice(index, 1);
  }
}
