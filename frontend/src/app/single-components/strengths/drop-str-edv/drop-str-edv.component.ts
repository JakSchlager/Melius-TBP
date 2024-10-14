import {Component, OnInit} from '@angular/core';
import {SelectItemGroup} from "primeng/api";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
  groupedMicrosoft!: any[];
  groupedAdobe!: any[];
  groupedDatabases!: any[];
  groupedOtherEDVApps!: any[];

  ngOnInit() {
    this.groupedMicrosoft = [
          { label: 'Word', value: 'Berlin' },
          { label: 'Excel', value: 'Frankfurt' },
          { label: 'PowerPoint', value: 'Hamburg' }
    ];

    this.groupedAdobe = [
      { label: 'Premiere Pro', value: 'PP' },
      { label: 'Illustrator', value: 'Ill' },
      { label: 'Photoshop', value: 'Ph' },
      { label: 'InDesign', value: 'ID' },
    ];

    this.groupedDatabases = [
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
    ];

    this.groupedOtherEDVApps = [
      { label: 'SAP', value: 'SAP' },
      { label: 'Final Cut', value: 'FC' },
      { label: 'Oracle Apex', value: 'apex' },
      { label: 'TYPO3', value: 'TYP' }
    ]
  }
}
