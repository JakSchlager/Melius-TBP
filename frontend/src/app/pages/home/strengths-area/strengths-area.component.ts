import { Component, inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownMenuHomeComponent} from "../../../single-components/home/dropdown-menu-home/dropdown-menu-home.component";
import { RatingModule} from 'primeng/rating';
import {DropdownModule} from "primeng/dropdown";
import {DropStrProgrComponent} from "../../../single-components/home/strengths/drop-str-progr/drop-str-progr.component";
import {DropStrEdvComponent} from "../../../single-components/home/strengths/drop-str-edv/drop-str-edv.component";
import {CharacteristicService} from "../../../services/characteristic.service";
import {Selectable} from "../../../interfaces/Selectable";
import {HomePageServiceService} from "../../../services/home-page-service.service";
import {StarRatingComponent} from "../../../single-components/home/star-rating/star-rating.component";
import {ProgrammingKnowledgeService} from "../../../services/programming-knowledge.service";
import {KnownLanguageService} from "../../../services/known-language.service";
import {KnownLanguage} from "../../../interfaces/KnownLanguage";
import {Router} from "@angular/router";
import {ProgrammingKnowledge} from "../../../interfaces/ProgrammingKnowledge";
import {SoftwareKnowledgeService} from "../../../services/software-knowledge.service";
import {SoftwareKnowledge} from "../../../interfaces/SoftwareKnowledge";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../../services/portfolio.service";

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
    TranslatePipe,
    NgIf,
  ],
  templateUrl: './strengths-area.component.html',
  styleUrl: './strengths-area.component.css'
})
export class StrengthsAreaComponent implements OnInit{
  characteristicService: CharacteristicService = inject(CharacteristicService);

  characteristics!: Selectable[];
  selectedCharacteristic!: Selectable[];

  characteristicsBox!: any
  knownLanguagesBox!: any;
  programmingKnowledgesBox!: any;
  softwareKnowledgesBox!: any;

  router: Router = inject(Router);
  dragBox : string = "cursor-default";
  showBorders : string = "";
  homePageService : HomePageServiceService = inject(HomePageServiceService);
  programmingKnowledgeService: ProgrammingKnowledgeService = inject(ProgrammingKnowledgeService);
  knownLanguageService: KnownLanguageService = inject(KnownLanguageService);
  softwareKnowledgeService: SoftwareKnowledgeService = inject(SoftwareKnowledgeService)
  portfolioService: PortfolioService = inject(PortfolioService);

  ngOnInit(): void {

    this.characteristicsBox = document.getElementById("characteristics");
    this.knownLanguagesBox = document.getElementById("knownLanguages");
    this.programmingKnowledgesBox = document.getElementById("programmingKnowledges");
    this.softwareKnowledgesBox = document.getElementById("softwareKnowledges");

    this.characteristicService.loadAllCharacteristics().subscribe(c => {
      console.log("Characteristics loaded",c)
      this.characteristics = c
    });

    setTimeout(() => {
      this.selectedCharacteristic = this.portfolioService.currPortfolio!.characteristics || [];

      let knownLanguages = this.portfolioService.currPortfolio!.knownLanguages;
      for(let currKnownLanguage of knownLanguages) {
        this.addKnownLanguage(currKnownLanguage)
      }

      let programmingKnowledges = this.portfolioService.currPortfolio!.programmingKnowledges
      for(let currProgrammingKnowledge of programmingKnowledges) {
        this.addProgrammingLanguage(currProgrammingKnowledge)
      }

      let softwareKnowledges = this.portfolioService.currPortfolio!.softwareKnowledges
      for(let currSoftwareKnowledge of softwareKnowledges) {
        this.addSoftware(currSoftwareKnowledge)
      }

      this.moveBoxes();

    },200)
  }

  constructor(private fb: FormBuilder) {

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
          languageName: new FormControl("", Validators.required),
          languageKnowledge: new FormControl(0, Validators.required),
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
          programmingId: new FormControl(0, Validators.required),
          label: new FormControl("", Validators.required),
          value: new FormControl("", Validators.required),
          programmingKnowledge: new FormControl(0, Validators.required)
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
            softwareId: new FormControl(0, Validators.required),
            label: new FormControl("", Validators.required),
            value: new FormControl("", Validators.required),
            softwareAppKnowledge: new FormControl(0, Validators.required)
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

      switch(this.draggedItem) {
        case this.characteristicsBox:
          this.portfolioService.currPortfolio!.characteristicsPosition = targetContainerId;
          break;
        case this.knownLanguagesBox:
          this.portfolioService.currPortfolio!.knownLanguagesPosition = targetContainerId;
          break;
        case this.programmingKnowledgesBox:
          this.portfolioService.currPortfolio!.programmingKnowledgesPosition = targetContainerId;
          break;
        case this.softwareKnowledgesBox:
          this.portfolioService.currPortfolio!.softwareKnowledgesPosition = targetContainerId;
          break;
      }

      this.portfolioService.updatePortfolio(this.portfolioService.currPortfolio!).subscribe();

      this.draggedItem = null;
    }
  }

  changeCharacteristics() {
    console.log("Characteristics changed",this.selectedCharacteristic)
    let portfolio = this.portfolioService.currPortfolio;

    portfolio!.characteristics = this.selectedCharacteristic;

    this.portfolioService.updatePortfolio(portfolio!).subscribe();
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
      portfolio: this.portfolioService.currPortfolio!
    }

    this.knownLanguageService.updateKnownLanguage(language).subscribe();

    this.reloadPage()
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
      portfolio: this.portfolioService.currPortfolio!
    }
    console.log("New SoftwareKnowledge", softwareKnowledge);


    this.softwareKnowledgeService.updateSoftwareKnowledge(softwareKnowledge).subscribe();

    this.reloadPage()
  }

  updateProgrammingKnowledge(formNumber: number) {
    let programmingKnowledge: ProgrammingKnowledge = {
      id: this.programmingKnowledgeFormItems.at(formNumber).value.id,
      programming: {
        id: this.programmingKnowledgeFormItems.at(formNumber).value.programmingId,
        label: this.programmingKnowledgeFormItems.at(formNumber).value.label,
        value: this.programmingKnowledgeFormItems.at(formNumber).value.value
      },
      portfolio: this.portfolioService.currPortfolio!,
      rating: this.programmingKnowledgeFormItems.at(formNumber).value.programmingKnowledge
    }
    console.log("New ProgrammingKnowledge", programmingKnowledge);


    this.programmingKnowledgeService.updateProgrammingLanguage(programmingKnowledge).subscribe();

    this.reloadPage()
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

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  moveBoxes() {
    if(this.portfolioService.currPortfolio!.characteristicsPosition) {
      this.draggedItem = this.characteristicsBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.characteristicsPosition)
    }

    if(this.portfolioService.currPortfolio!.knownLanguagesPosition) {
      this.draggedItem = this.knownLanguagesBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.knownLanguagesPosition)
    }

    if(this.portfolioService.currPortfolio!.programmingKnowledgesPosition) {
      this.draggedItem = this.programmingKnowledgesBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.programmingKnowledgesPosition)
    }

    if(this.portfolioService.currPortfolio!.softwareKnowledgesPosition) {
      this.draggedItem = this.softwareKnowledgesBox;
      this.onDrop(new DragEvent("drag"), this.portfolioService.currPortfolio!.softwareKnowledgesPosition)
    }
  }
}

