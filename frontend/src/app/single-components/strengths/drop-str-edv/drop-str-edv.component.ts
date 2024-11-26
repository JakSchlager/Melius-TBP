import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {SelectItemGroup} from "primeng/api";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Selectable} from "../../../interfaces/Selectable";
import {SoftwareKnowledgeService} from "../../../services/software-knowledge.service";
import {SoftwareService} from "../../../services/software.service";

@Component({
  selector: 'app-drop-str-edv',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './drop-str-edv.component.html',
  styleUrl: './drop-str-edv.component.css'
})
export class DropStrEdvComponent implements OnInit{
  softwares!: Selectable[];

  @Input() selectedSoftware!: string;

  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  softwareService: SoftwareService = inject(SoftwareService)

  ngOnInit() {
    /*this.softwares = [
      {id:1, label: 'Word', value: 'word' },
      {id:2, label: 'Excel', value: 'excel' },
      {id:3, label: 'PowerPoint', value: 'powerpoint' },
      {id:4, label: 'Premiere Pro', value: 'PP' },
      {id:5, label: 'Illustrator', value: 'Ill' },
      {id:6, label: 'Photoshop', value: 'Ph' },
      {id:7, label: 'InDesign', value: 'ID' },
      {id:8, label: 'MySQL', value: 'mySQL' },
      {id:9, label: 'Postgress', value: 'postgress' },
      {id:10, label: 'MongoDB', value: 'mongoDB' },
      {id:11, label: 'Derby', value: 'derby' },
      {id:12, label: 'Redshift', value: 'redshift' },
      {id:13, label: 'Hive', value: 'hive' },
      {id:14, label: 'Azure SQL', value: 'azure' },
      {id:15, label: 'BigQuery', value: 'bigQuery' },
      {id:16, label: 'ClickHouse', value: 'clickHouse' },
      {id:17, label: 'CockroachDB', value: 'cockroach' },
      {id:18, label: 'DynamoDB', value: 'dynamo' },
      {id:19, label: 'H2', value: 'h2' },
      {id:20, label: 'MariaDB', value: 'mariaDB' },
      {id:21, label: 'Oracle', value: 'oracle' },
      {id:22, label: 'SAP', value: 'SAP' },
      {id:23, label: 'Final Cut', value: 'FC' },
      {id:24, label: 'Oracle Apex', value: 'apex' },
      {id:25, label: 'TYPO3', value: 'TYP' }
    ]*/

    this.softwareService.loadAllProgrammingLanguages().subscribe(s => {
      this.softwares = s
      console.log("Softwares loaded",this.softwares);
      if(this.selectedSoftware === undefined) {
        this.selectedSoftware = this.softwares.at(0)!.value;
        this.selectSoftware()
      }
    })

  }

  selectSoftware() {
    this.eventEmitter.emit(this.softwares.find(s => s.value == this.selectedSoftware));
  }
}
