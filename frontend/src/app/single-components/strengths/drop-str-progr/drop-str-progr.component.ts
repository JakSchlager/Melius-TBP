import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Selectable} from "../../../interfaces/Selectable";
import {ProgrammingKnowledgeService} from "../../../services/programming-knowledge.service";

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
  programmingKnowledgeService: ProgrammingKnowledgeService = inject(ProgrammingKnowledgeService)

  programmingLanguages !: Selectable[]

  ngOnInit() {
    this.programmingLanguages = [
      { label: 'Java', value: 'java' },
      { label: 'C', value: 'c' },
      { label: 'C#', value: 'c#' },
      { label: 'C++', value: 'c++' },
      { label: 'JavaScript', value: 'js' },
      { label: 'TypeScript', value: 'ts' },
      { label: 'PHP', value: 'php' },
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'Python', value: 'py' },
      { label: 'Swift', value: 'swift' },
      { label: 'Ruby', value: 'ruby' },
    ];

    this.programmingKnowledgeService.loadAllProgrammingKnowledges().subscribe(p => {
      this.programmingLanguages = p;
    })

    this.selectedLanguage = "java";
    this.selectLanguage()
  }

  selectLanguage() {
   this.eventEmitter.emit(this.selectedLanguage);
  }
}
