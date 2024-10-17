import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-drop-str-progr',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './drop-str-progr.component.html',
  styleUrl: './drop-str-progr.component.css'
})
export class DropStrProgrComponent implements OnInit{

  selectedLanguage!: any;
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  programmingLanguages !: any[]

  ngOnInit() {
    this.programmingLanguages = [
      { name: 'Java', value: 'java' },
      { name: 'C', value: 'c' },
      { name: 'C#', value: 'c#' },
      { name: 'C++', value: 'c++' },
      { name: 'JavaScript', value: 'js' },
      { name: 'TypeScript', value: 'ts' },
      { name: 'PHP', value: 'php' },
      { name: 'HTML', value: 'html' },
      { name: 'CSS', value: 'css' },
      { name: 'Python', value: 'py' },
      { name: 'Swift', value: 'swift' },
      { name: 'Ruby', value: 'ruby' },
    ];
  }

  selectLanguage() {
   this.eventEmitter.emit(this.selectedLanguage);
  }
}
