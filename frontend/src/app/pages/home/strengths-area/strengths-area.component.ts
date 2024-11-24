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
import {HomePageServiceService} from "../../../services/home-page-service.service";
import {StarRatingComponent} from "../../../single-components/star-rating/star-rating.component";

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
  userLanguageRating !: number;

  groupedSoftwareApps: SelectItemGroup[]
  dragBox : string = "cursor-default";
  showBorders : string = "";
  homePageService : HomePageServiceService = inject(HomePageServiceService);

  ngOnInit(): void {
    this.characteristicService.loadAllCharacteristics().subscribe(c => {
      console.log("Characteristics loaded",c)
      this.characteristics = c
    });

    setTimeout(() => {
      this.selectedCharacteristic = this.profileService.loggedInUser!.characteristics
    },100)
  }

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    this.groupedSoftwareApps = [
      {
        label: 'Microsoft',
        value: 'ms',
        items: [
          { label: 'Word', value: 'Berlin' },
          { label: 'Excel', value: 'Frankfurt' },
          { label: 'PowerPoint', value: 'Hamburg' },
        ]
      },
      {
        label: 'Adobe',
        value: 'adobe',
        items: [
          { label: 'Premiere Pro', value: 'PP' },
          { label: 'Illustrator', value: 'Ill' },
          { label: 'Photoshop', value: 'Ph' },
          { label: 'InDesign', value: 'ID' }
        ]
      },
      {
        label: 'Datenbanken',
        value: 'db',
        items: [
          { label: 'MySQL', value: 'mySQL' },
          { label: 'Postgress', value: 'postgress' },
          { label: 'MongoDB', value: 'mongoDB' },
          { label: 'Derby', value: 'derby' },
          { label: 'Redshift', value: 'redshift' },
          { label: 'Hive', value: 'hive' },
          { label: 'Azure SQL', value: 'azure' },
          { label: 'BigQuery', value: 'bigQuery' },
          { label: 'ClickHouse', value: 'clickHouse' },
          { label: 'CockroachDB', value: 'cockroach' },
          { label: 'DynamoDB', value: 'dynamo' },
          { label: 'H2', value: 'h2' },
          { label: 'MariaDB', value: 'mariaDB' },
          { label: 'Oracle', value: 'oracle' },
        ]
      },
      {
        label: 'Andere',
        value: 'other',
        items: [
          { label: 'SAP', value: 'SAP' },
          { label: 'Final Cut', value: 'FC' },
          { label: 'TYPO3', value: 'TYP' },
        ]
      },
    ];
  }

  // Add, Get and delete Languages from List
  knownLanguagesForm = this.fb.group({
    knownLanguagesFormItems: this.fb.array([])
  });

  get knownLanguagesFormItems() {
    return this.knownLanguagesForm.get('knownLanguagesFormItems') as FormArray;
  }

  deleteKnownLanguage(index: number) {
    this.knownLanguagesFormItems.removeAt(index);
  }

  addKnownLanguage() {
    const newLanguage =  this.fb.group({
      languageName: [''],
      languageKnowledge: [0],
    });
    this.knownLanguagesFormItems.push(newLanguage);
  }


  // Add, Get and delete Programming Knowledge from List
  programmingKnowledgeForm = this.fb.group({
    programmingKnowledgeFormItems: this.fb.array([])
  });

  get programmingKnowledgeFormItems() {
    return this.programmingKnowledgeForm.get('programmingKnowledgeFormItems') as FormArray;
  }

  deleteProgrammingLanguage(index: number) {
    this.programmingKnowledgeFormItems.removeAt(index);
  }

  addProgrammingLanguage() {
    this.programmingKnowledgeFormItems.push(
      this.fb.group({
        programmingName: [""],
        programmingKnowledge: [0],
      })
    )
  }

  // Add, Get and delete Software Knowledge from List
  softwareKnowledgeForm = this.fb.group({
    softwareKnowledgeFormItems: this.fb.array([])
  });


  get softwareKnowledgeFormItems() {
    return this.softwareKnowledgeForm.get('softwareKnowledgeFormItems') as FormArray;
  }

  deleteSoftware(index: number) {
    this.softwareKnowledgeFormItems.removeAt(index);
  }

  addSoftware() {
    this.softwareKnowledgeFormItems.push(
      this.fb.group({
        softwareApp: [''],
        softwareAppKnowledge: [0],
      })
    )
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

  selectProgrammingLanguage(selectedProgrammingLanguage: any, formNumber: number) {
    this.programmingKnowledgeFormItems.at(formNumber).value.programmingName = selectedProgrammingLanguage;
  }

  updateLanguage(i: number) {
  }

  updateSoftware(i: number) {

  }

  updateProgrammingKnowledge(formNumber: number) {
    console.log(this.programmingKnowledgeFormItems.at(formNumber))
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
}

