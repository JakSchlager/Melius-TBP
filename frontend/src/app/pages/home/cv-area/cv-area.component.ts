import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {HomeNavbarComponent} from "../../../navigation/home-navbar/home-navbar.component";
import {SideBarComponent} from "../../../navigation/side-bar/side-bar.component";
import {formatDate, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatDateRangeInput} from "@angular/material/datepicker";
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {GeneralInfoService} from "../../../services/general-info.service";
import {ProfileService} from "../../../services/profile.service";
import {GeneralInfo} from "../../../interfaces/general-info";
import {DropdownMenuHomeComponent} from "../../../single-components/home/dropdown-menu-home/dropdown-menu-home.component";
import {Router} from "@angular/router";
import {Education} from "../../../interfaces/education";
import {EducationService} from "../../../services/education.service";
import {WorkExperience} from "../../../interfaces/work-experience";
import {WorkExperienceService} from "../../../services/work-experience.service";
import {HomePageServiceService} from "../../../services/home-page-service.service";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../../services/portfolio.service";

@Component({
  selector: 'app-cv-area',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    DropdownMenuHomeComponent,
    NgClass,
    NgIf,
    FormsModule,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './cv-area.component.html',
  styleUrl: './cv-area.component.css'
})
export class CvAreaComponent implements OnInit{
  generalInfoService: GeneralInfoService = inject(GeneralInfoService);
  profileService: ProfileService = inject(ProfileService);
  educationService: EducationService = inject(EducationService);
  workExperienceService: WorkExperienceService = inject(WorkExperienceService);
  portfolioService: PortfolioService = inject(PortfolioService);
  router: Router = inject(Router);
  dragBox!: string;

  generalInfoBox!: any;
  educationsBox!: any;
  workExperienceBox!: any;

  showBorders!: string;
  homePageService : HomePageServiceService = inject(HomePageServiceService);

  generalInfoForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    gender: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    zipCode: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
});

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {

    this.generalInfoBox = document.getElementById("generalInfoBox");
    this.educationsBox = document.getElementById("educationsBox");
    this.workExperienceBox = document.getElementById("workExperienceBox");

    setTimeout(() => {
      let generalInfo: GeneralInfo = this.portfolioService.currPortfolio!.generalInfo;

      this.generalInfoForm.controls['id'].setValue(generalInfo!.id);
      this.generalInfoForm.controls['gender'].setValue(generalInfo!.gender);
      this.generalInfoForm.controls['firstName'].setValue(this.profileService.loggedInUser!.firstName);
      this.generalInfoForm.controls['lastName'].setValue(this.profileService.loggedInUser!.lastName);
      this.generalInfoForm.controls['email'].setValue(this.profileService.loggedInUser!.email);
      this.generalInfoForm.controls['phoneNumber'].setValue(this.profileService.loggedInUser!.phoneNumber);
      this.generalInfoForm.controls['zipCode'].setValue(generalInfo!.zipCode);
      this.generalInfoForm.controls['city'].setValue(generalInfo!.city);
      this.generalInfoForm.controls['address'].setValue(generalInfo!.address);

      if(this.portfolioService.currPortfolio!.educations != undefined) {
        let educations: Education[] = this.portfolioService.currPortfolio!.educations.slice().sort((a: Education, b: Education) => {
          return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
        });
        for (let currEducation of educations) {
          this.addEducationInfo(currEducation);
        }
      }

      if(this.portfolioService.currPortfolio!.workExperiences != undefined) {
        let workExperiences = this.portfolioService.currPortfolio!.workExperiences.slice().sort((a: WorkExperience, b: WorkExperience) => {
          return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
        });
        for (let currWorkExperience of workExperiences) {
          this.addJobExperiencesInfo(currWorkExperience);
        }
      }

      this.moveBoxes()

    }, 200)

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
          educationalInst: new FormControl("", Validators.required),
          eIdateFrom: new FormControl("", Validators.required),
          eIdateTo: new FormControl("", Validators.required),
          eIFinished: new FormControl("", Validators.required)
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
          companyName: new FormControl("", Validators.required),
          workFrom: new FormControl("", Validators.required),
          workTo: new FormControl("", Validators.required),
          moreInfo: new FormControl("", Validators.required)
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

    this.profileService.updateProfile(profile!).subscribe(p => {
      let newGeneralInfo: GeneralInfo = {
        id: this.generalInfoForm!.controls["id"].value!,
        address: this.generalInfoForm!.controls["address"].value!,
        city: this.generalInfoForm!.controls["city"].value!,
        gender: this.generalInfoForm!.controls["gender"].value!,
        zipCode: this.generalInfoForm!.controls["zipCode"].value!
      }

      this.generalInfoService.updateGeneralInfo(newGeneralInfo).subscribe();
    });

    this.reloadPage()
  }

  updateEducation(formNumber: number) {
      let education: Education = {
        fromDate: new Date(this.educationFormItems.at(formNumber).value.eIdateFrom),
        finished: this.educationFormItems.at(formNumber).value.eIFinished,
        id: this.educationFormItems.at(formNumber).value.id,
        name: this.educationFormItems.at(formNumber).value.educationalInst,
        toDate: new Date(this.educationFormItems.at(formNumber).value.eIdateTo),
        portfolio: this.portfolioService.currPortfolio!
      }

      this.educationService.updateEducation(education).subscribe();

      this.reloadPage()

  }

  updateWorkExperience(formNumber: number) {
    let workExperience: WorkExperience = {
      id: this.jobExperiencesFormItems.at(formNumber).value.id,
      fromDate: new Date(this.jobExperiencesFormItems.at(formNumber).value.workFrom),
      toDate: new Date(this.jobExperiencesFormItems.at(formNumber).value.workTo),
      company: this.jobExperiencesFormItems.at(formNumber).value.companyName,
      information: this.jobExperiencesFormItems.at(formNumber).value.moreInfo,
      portfolio: this.portfolioService.currPortfolio!
    }

    this.workExperienceService.updateWorkExperience(workExperience).subscribe();
    this.reloadPage()
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

      switch (this.draggedItem) {
        case this.generalInfoBox:
          this.portfolioService.currPortfolio!.generalInfoPosition = targetContainerId;
          break;
        case this.educationsBox:
          this.portfolioService.currPortfolio!.educationsPosition = targetContainerId;
          break;
        case this.workExperienceBox:
          this.portfolioService.currPortfolio!.workExperiencesPosition = targetContainerId;
          break;
      }
      this.portfolioService.updatePortfolio(this.portfolioService.currPortfolio!).subscribe();

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

  checkDraggable(): boolean {
    if (this.homePageService.isBoxDraggable) {
      this.dragBox = 'cursor-pointer';
      this.showBorders = 'border-2 border-dashed border-gray-200 rounded-lg';

      return true;
    }

    else {
      this.dragBox = 'cursor-default';
      this.showBorders = 'border-none';

      return false;
    }
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  moveBoxes() {
    if (this.portfolioService.currPortfolio!.generalInfoPosition) {
      this.draggedItem = this.generalInfoBox
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.generalInfoPosition);
    }

    if (this.portfolioService.currPortfolio!.educationsPosition) {
      this.draggedItem = this.educationsBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.educationsPosition);
    }

    if (this.portfolioService.currPortfolio!.workExperiencesPosition) {
      this.draggedItem = this.workExperienceBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.workExperiencesPosition);
    }
  }
}
