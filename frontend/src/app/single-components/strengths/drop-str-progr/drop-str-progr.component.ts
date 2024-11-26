import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Selectable} from "../../../interfaces/Selectable";
import {ProgrammingLanguageService} from "../../../services/programming-language.service";

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

  @Input() selectedLanguage!: string;
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();
  programmingLanguageService: ProgrammingLanguageService = inject(ProgrammingLanguageService)

  programmingLanguages !: Selectable[]

  ngOnInit() {
    /*this.programmingLanguages = [
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
    ];*/

    this.programmingLanguageService.loadAllProgrammingLanguages().subscribe(p => {
      this.programmingLanguages = p;
      console.log("Programming languages: ",this.programmingLanguages);

      if(this.selectedLanguage === undefined) {
          this.selectedLanguage = this.programmingLanguages.at(0)!.value;
          this.selectLanguage()
      }
    })

  }

  selectLanguage() {
    this.eventEmitter.emit(this.programmingLanguages.find(p => p.value == this.selectedLanguage));
  }
}
