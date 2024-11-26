import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {MatSlider, MatSliderThumb, MatSliderVisualThumb} from "@angular/material/slider";
import {MatIcon} from "@angular/material/icon";
import {MultiSelectModule} from "primeng/multiselect";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";
import {Rating, RatingModule} from 'primeng/rating';
import { SelectItemGroup } from 'primeng/api';
import {DropdownModule} from "primeng/dropdown";
import {DropStrProgrComponent} from "../../../single-components/strengths/drop-str-progr/drop-str-progr.component";
import {DropStrEdvComponent} from "../../../single-components/strengths/drop-str-edv/drop-str-edv.component";
import {CharacteristicService} from "../../../services/characteristic.service";
import {Selectable} from "../../../interfaces/Selectable";
import {ProfileService} from "../../../services/profile.service";
import {HomePageServiceService} from "../../../services/home-page-service.service";
import {StarRatingComponent} from "../../../single-components/star-rating/star-rating.component";
import {ProgrammingKnowledgeService} from "../../../services/programming-knowledge.service";
import {KnownLanguageService} from "../../../services/known-language.service";
import {KnownLanguage} from "../../../interfaces/KnownLanguage";
import {Router} from "@angular/router";
import {ProgrammingKnowledge} from "../../../interfaces/ProgrammingKnowledge";
import {SoftwareKnowledgeService} from "../../../services/software-knowledge.service";
import {SoftwareKnowledge} from "../../../interfaces/SoftwareKnowledge";

@Component({
  selector: 'app-strengths-area',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RatingModule,
    MultiSelectModule,
    NgClass,
    FloatLabelModule,
    ChipsModule,
    CheckboxModule,
    DropdownMenuHomeComponent,
    RatingModule,
    DropdownModule,
    DropStrProgrComponent,
    DropStrEdvComponent,
    StarRatingComponent,
  ],
  templateUrl: './strengths-area.component.html',
  styleUrl: './strengths-area.component.css'
})
export class StrengthsAreaComponent implements OnInit{
  characteristicService: CharacteristicService = inject(CharacteristicService);
  profileService: ProfileService = inject(ProfileService);

  characteristics!: Selectable[];
  selectedCharacteristic!: Selectable[];

  router: Router = inject(Router);
  dragBox : string = "cursor-default";
  showBorders : string = "";
  homePageService : HomePageServiceService = inject(HomePageServiceService);
  programmingKnowledgeService: ProgrammingKnowledgeService = inject(ProgrammingKnowledgeService);
  knownLanguageService: KnownLanguageService = inject(KnownLanguageService);
  softwareKnowledgeService: SoftwareKnowledgeService = inject(SoftwareKnowledgeService)

  ngOnInit(): void {
    this.characteristicService.loadAllCharacteristics().subscribe(c => {
      console.log("Characteristics loaded",c)
      this.characteristics = c
    });

    setTimeout(() => {
      this.selectedCharacteristic = this.profileService.loggedInUser!.characteristics || [];

      this.knownLanguageService.getKnownLanguagesByProfileId(this.profileService.loggedInUser!.id).subscribe(k => {
        for(let currKnownLanguage of k) {
          this.addKnownLanguage(currKnownLanguage)
        }
      })

      this.programmingKnowledgeService.getProgrammingKnowledgeByProfileId(this.profileService.loggedInUser!.id).subscribe(p => {
        for(let currProgrammingKnowledge of p) {
          this.addProgrammingLanguage(currProgrammingKnowledge)
        }
      })

      this.softwareKnowledgeService.getSoftwareKnowledgesByProfileId(this.profileService.loggedInUser!.id).subscribe(s => {
        for(let currSoftwareKnowledge of s) {
          this.addSoftware(currSoftwareKnowledge)
        }
      })

    },100)
  }

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {

  }

  // Add, Get and delete Languages from List
  knownLanguagesForm = this.fb.group({
    knownLanguagesFormItems: this.fb.array([])
  });

  get knownLanguagesFormItems() {
    return this.knownLanguagesForm.get('knownLanguagesFormItems') as FormArray;
  }

  deleteKnownLanguage(index: number) {
    this.knownLanguageService.deleteKnownLanguage(this.knownLanguagesFormItems.at(index).value.id).subscribe()
    this.knownLanguagesFormItems.removeAt(index);
  }

  addKnownLanguage(knownLanguage?: KnownLanguage) {
    if(knownLanguage === undefined) {
      this.knownLanguagesFormItems.push(
        this.fb.group({
          id: [0],
          languageName: [''],
          languageKnowledge: [0],
        })
      )
    } else {
      this.knownLanguagesFormItems.push(
        this.fb.group({
          id: knownLanguage.id,
          languageName: knownLanguage.language,
          languageKnowledge: knownLanguage.rating,
        })
      )
    }
  }


  // Add, Get and delete Programming Knowledge from List
  programmingKnowledgeForm = this.fb.group({
    programmingKnowledgeFormItems: this.fb.array([])
  });

  get programmingKnowledgeFormItems() {
    return this.programmingKnowledgeForm.get('programmingKnowledgeFormItems') as FormArray;
  }

  deleteProgrammingLanguage(index: number) {
    this.programmingKnowledgeService.deleteProgrammingKnowledge(this.programmingKnowledgeFormItems.at(index).value.id).subscribe()
    this.programmingKnowledgeFormItems.removeAt(index);
  }

  addProgrammingLanguage(programmingKnowledge?: ProgrammingKnowledge) {
    if(programmingKnowledge === undefined) {
      this.programmingKnowledgeFormItems.push(
        this.fb.group({
          id: [""],
          programmingId: [0],
          label: [""],
          value: [""],
          programmingKnowledge: [0]
        })
      )
    } else {
      this.programmingKnowledgeFormItems.push(
        this.fb.group({
          id: programmingKnowledge.id,
          programmingId: programmingKnowledge.programming.id,
          label: programmingKnowledge.programming.label,
          value: programmingKnowledge.programming.value,
          programmingKnowledge: programmingKnowledge.rating
        })
      )
    }

  }

  // Add, Get and delete Software Knowledge from List
  softwareKnowledgeForm = this.fb.group({
    softwareKnowledgeFormItems: this.fb.array([])
  });


  get softwareKnowledgeFormItems() {
    return this.softwareKnowledgeForm.get('softwareKnowledgeFormItems') as FormArray;
  }

  deleteSoftware(index: number) {
    this.softwareKnowledgeService.deleteSoftwareKnowledge(this.softwareKnowledgeFormItems.at(index).value.id).subscribe();
    this.softwareKnowledgeFormItems.removeAt(index);
  }

  addSoftware(softwareKnowledge?: SoftwareKnowledge) {
    if(softwareKnowledge === undefined) {
        this.softwareKnowledgeFormItems.push(
          this.fb.group({
            id: [""],
            softwareId: [0],
            label: [""],
            value: [""],
            softwareAppKnowledge: [0]
          })
        )
    } else {
      this.softwareKnowledgeFormItems.push(
        this.fb.group({
          id: softwareKnowledge.id,
          softwareId: softwareKnowledge.software.id,
          label: softwareKnowledge.software.label,
          value: softwareKnowledge.software.value,
          softwareAppKnowledge: softwareKnowledge.rating
        })
      )
    }

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

  changeCharacteristics() {
    console.log("Characteristics changed",this.selectedCharacteristic)
    let profile = this.profileService.loggedInUser;

    profile!.characteristics = this.selectedCharacteristic;

    this.profileService.updateProfile(profile!).subscribe();
  }

  selectProgrammingLanguage(selectedProgrammingLanguage: Selectable, formNumber: number) {

    this.programmingKnowledgeFormItems.at(formNumber).patchValue({
      programmingId: selectedProgrammingLanguage.id,
      label: selectedProgrammingLanguage.label,
      value: selectedProgrammingLanguage.value
    });

    console.log(this.programmingKnowledgeFormItems.at(formNumber))
  }

  updateLanguage(formNumber: number) {
    let language: KnownLanguage = {
      id: this.knownLanguagesFormItems.at(formNumber).value.id,
      language: this.knownLanguagesFormItems.at(formNumber).value.languageName,
      rating: this.knownLanguagesFormItems.at(formNumber).value.languageKnowledge,
      profile: this.profileService.loggedInUser!
    }

    this.knownLanguageService.updateKnownLanguage(language).subscribe();
    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['home/strengths/']);
      });
    }, 100);
  }

  updateSoftware(formNumber: number) {
    let softwareKnowledge: SoftwareKnowledge = {
      id: this.softwareKnowledgeFormItems.at(formNumber).value.id,
      software: {
        id: this.softwareKnowledgeFormItems.at(formNumber).value.softwareId,
        label: this.softwareKnowledgeFormItems.at(formNumber).value.label,
        value: this.softwareKnowledgeFormItems.at(formNumber).value.value
      },
      rating: this.softwareKnowledgeFormItems.at(formNumber).value.softwareAppKnowledge,
      profile: this.profileService.loggedInUser!
    }
    console.log("New SoftwareKnowledge", softwareKnowledge);
    this.softwareKnowledgeService.updateSoftwareKnowledge(softwareKnowledge).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['home/strengths/']);
      });
    }, 100);

  }

  updateProgrammingKnowledge(formNumber: number) {
    let programmingKnowledge: ProgrammingKnowledge = {
      id: this.programmingKnowledgeFormItems.at(formNumber).value.id,
      programming: {
        id: this.programmingKnowledgeFormItems.at(formNumber).value.programmingId,
        label: this.programmingKnowledgeFormItems.at(formNumber).value.label,
        value: this.programmingKnowledgeFormItems.at(formNumber).value.value
      },
      profile: this.profileService.loggedInUser!,
      rating: this.programmingKnowledgeFormItems.at(formNumber).value.programmingKnowledge
    }
    console.log("New ProgrammingKnowledge", programmingKnowledge);
    this.programmingKnowledgeService.updateProgrammingLanguage(programmingKnowledge).subscribe();

    setTimeout(() => {
      this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
        this.router.navigate(['home/strengths/']);
      });
    }, 100);
  }

  checkDraggable(): boolean {
    if (this.homePageService.isBoxDraggable) {
      this.showBorders = 'border-2 border-dashed border-gray-200 rounded-lg';
      this.dragBox = 'cursor-pointer';

      return true;
    }

    else {
      this.showBorders = 'border-none';
      this.dragBox = 'cursor-default';

      return false;
    }
  }

  rateKnownLanguage(event: any, formNumber: number) {
    console.log(event)
    this.knownLanguagesFormItems.at(formNumber).patchValue({languageKnowledge: event});
  }

  selectSoftware(selectedSoftware: Selectable, formNumber: number) {
    this.softwareKnowledgeFormItems.at(formNumber).patchValue({
      softwareId: selectedSoftware.id,
      label:  selectedSoftware.label,
      value: selectedSoftware.value
    })

    console.log("Selected Software", this.softwareKnowledgeFormItems.at(formNumber))
  }
}

