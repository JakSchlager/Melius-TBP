import {Component, OnInit, inject} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {MatSlider, MatSliderThumb, MatSliderVisualThumb} from "@angular/material/slider";
import {MatIcon} from "@angular/material/icon";
import {MultiSelectModule} from "primeng/multiselect";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownMenuHomeComponent} from "../../../single-components/dropdown-menu-home/dropdown-menu-home.component";
import { RatingModule } from 'primeng/rating';
import { SelectItemGroup } from 'primeng/api';
import {DropdownModule} from "primeng/dropdown";
import {DropStrProgrComponent} from "../../../single-components/strengths/drop-str-progr/drop-str-progr.component";
import {DropStrEdvComponent} from "../../../single-components/strengths/drop-str-edv/drop-str-edv.component";
import {CharacteristicService} from "../../../services/characteristic.service";
import {Characteristic} from "../../../interfaces/Characteristic";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-strengths-area',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    MatSlider,
    MatSliderVisualThumb,
    MatSliderThumb,
    MatIcon,
    ReactiveFormsModule,
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
  ],
  templateUrl: './strengths-area.component.html',
  styleUrl: './strengths-area.component.css'
})
export class StrengthsAreaComponent implements OnInit{
  characteristicService: CharacteristicService = inject(CharacteristicService);
  profileService: ProfileService = inject(ProfileService);

  characteristics!: Characteristic[];
  selectedCharacteristic!: Characteristic[];
  userLanguageRating !: number;

  groupedSoftwareApps: SelectItemGroup[]
  selectedSoftwareApp !: string;


  ngOnInit(): void {
    this.characteristicService.loadAllCharacteristics().subscribe(c => {
      console.log("Characteristics loaded",c)
      this.characteristics = c
    });

    setTimeout(() => {
      this.selectedCharacteristic = this.profileService.loggedInUser!.characteristics
    },100)
  }

  constructor(private fb: FormBuilder) {
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
        programmingName: [],
        programmingKnowledge: [Number],
      })
    )
  }


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
        softwareAppKnowledge: [Number],
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
    console.log(this.programmingKnowledgeFormItems.at(formNumber).value.programmingName);
  }
}

