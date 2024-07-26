import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatSlider, MatSliderThumb, MatSliderVisualThumb} from "@angular/material/slider";
import {MatIcon} from "@angular/material/icon";

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
    ReactiveFormsModule
  ],
  templateUrl: './strengths-area.component.html',
  styleUrl: './strengths-area.component.css'
})
export class StrengthsAreaComponent {

  constructor(private fb: FormBuilder) {
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
}
