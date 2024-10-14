import {Component, OnInit} from '@angular/core';
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
  characteristics!: any[];
  selectedCharacteristic!: any[];
  userLanguageRating !: number;

  programmingLanguages !: any[]
  selectedProgrammingLanguage !: any;

  groupedSoftwareApps: SelectItemGroup[]
  selectedSoftwareApp !: string;


  ngOnInit(): void {
    this.programmingLanguages = [
      { name: 'Java', code: 'java' },
      { name: 'C', code: 'c' },
      { name: 'C#', code: 'c#' },
      { name: 'C++', code: 'c++' },
      { name: 'JavaScript', code: 'js' },
      { name: 'TypeScript', code: 'ts' },
      { name: 'PHP', code: 'php' },
      { name: 'HTML', code: 'html' },
      { name: 'CSS', code: 'css' },
      { name: 'Python', code: 'py' },
      { name: 'Swift', code: 'swift' },
      { name: 'Ruby', code: 'ruby' },
    ];

    this.characteristics = [
      { label: 'Kreativ', value: 'kreativ' },
      { label: 'Pünktlich', value: 'puenktlich' },
      { label: 'Teamfähig', value: 'teamfaehig' },
      { label: 'Freundlich', value: 'freundlich' },
      { label: 'Hilfsbereit', value: 'hilfsbereit' },
      { label: 'Organisiert', value: 'organisiert' },
      { label: 'Zuverlässig', value: 'zuverlaessig' },
      { label: 'Engagiert', value: 'engagiert' },
      { label: 'Motiviert', value: 'motiviert' },
      { label: 'Flexibel', value: 'flexibel' },
      { label: 'Kommunikativ', value: 'kommunikativ' },
      { label: 'Kooperativ', value: 'kooperativ' },
      { label: 'Analytisches Denken', value: 'analytisches-denken' },
      { label: 'Belastbarkeit', value: 'belastbarkeit' },
      { label: 'Eigeniniziative', value: 'eigeniniziative' },
    ];
    this.selectedCharacteristic = [];
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
        programmingName: [''],
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

}

