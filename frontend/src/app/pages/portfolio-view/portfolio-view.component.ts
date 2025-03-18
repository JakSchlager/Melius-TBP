import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PortfolioService} from "../../services/portfolio.service";
import {Portfolio} from "../../interfaces/Portfolio";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {DropdownAvatarComponent} from "../../single-components/home/user-avatar/dropdown-avatar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle, ViewportScroller} from "@angular/common";
import {DropStrEdvComponent} from "../../single-components/home/strengths/drop-str-edv/drop-str-edv.component";
import {DropStrProgrComponent} from "../../single-components/home/strengths/drop-str-progr/drop-str-progr.component";
import {MultiSelectModule} from "primeng/multiselect";
import {StarRatingComponent} from "../../single-components/home/star-rating/star-rating.component";
import $ from "jquery";
import {TranslatePipe} from "@ngx-translate/core";
import {Image} from "../../interfaces/image";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-portfolio-view',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    DropStrEdvComponent,
    DropStrProgrComponent,
    MultiSelectModule,
    StarRatingComponent,
    NgStyle,
    TranslatePipe,
    RouterLink,
    NgClass
  ],
  templateUrl: './portfolio-view.component.html',
  styleUrl: './portfolio-view.component.css'
})
export class PortfolioViewComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  portfolioService: PortfolioService = inject(PortfolioService);
  imageService: ImageService = inject(ImageService);
  portfolio!: Portfolio;
  pictureUrl!: string;
  disabledInputs: boolean = true;
  buttonClass!: string;

  isLoading: boolean = true;
  fadeOut: boolean = false;

  backgroundColor!: string;
  backgroundImageUrl: string | ArrayBuffer | null = null;

  generalInfoBox!: any;
  educationsBox!: any;
  workExperiencesBox!: any;
  characteristicsBox!: any;
  knownLanguagesBox!: any;
  programmingKnowledgesBox!: any;
  softwareKnowledgesBox!: any;
  uploadedFiles: Image[] = []

  activeSection: string = '';

  ngOnInit() {

    const id = Number(this.route.snapshot.params['id']);

    this.portfolioService.getPortfolioById(id).subscribe(portfolio => {
      this.portfolio = portfolio;

      this.generalInfoBox = document.getElementById("generalInfoBox");
      this.educationsBox = document.getElementById("educationsBox");
      this.workExperiencesBox = document.getElementById("workExperiencesBox");
      this.characteristicsBox = document.getElementById("characteristicsBox");
      this.knownLanguagesBox = document.getElementById("knownLanguagesBox");
      this.programmingKnowledgesBox = document.getElementById("programmingKnowledgesBox");
      this.softwareKnowledgesBox = document.getElementById("softwareKnowledgesBox");

      if (this.portfolio.generalInfoPosition) {
        this.moveToColumn(this.generalInfoBox, this.portfolio.generalInfoPosition);
      }

      if (this.portfolio.educationsPosition) {
        this.moveToColumn(this.educationsBox, this.portfolio.educationsPosition);
      }

      if (this.portfolio.workExperiencesPosition) {
        this.moveToColumn(this.workExperiencesBox, this.portfolio.workExperiencesPosition);
      }

      if(this.portfolio.characteristicsPosition) {
        this.moveToColumn(this.characteristicsBox, this.portfolio.characteristicsPosition)
      }

      if(this.portfolio.knownLanguagesPosition) {
        this.moveToColumn(this.knownLanguagesBox, this.portfolio.knownLanguagesPosition)
      }

      if(this.portfolio.programmingKnowledgesPosition) {
        this.moveToColumn(this.programmingKnowledgesBox, this.portfolio.programmingKnowledgesPosition)
      }

      if(this.portfolio.softwareKnowledgesPosition) {
        this.moveToColumn(this.softwareKnowledgesBox, this.portfolio.softwareKnowledgesPosition)
      }

      this.imageService.getImagesByPortfolioId(this.portfolio.profile.id).subscribe(i => {
        if(i != undefined && i.length != 0 ) {
          this.uploadedFiles = i;
          console.log("Loaded Images", this.uploadedFiles);

          setTimeout(() => {
            for(let image of this.uploadedFiles) {

              let position = "";

              if(image.position == null) {
                position = 'firstFileProjectCol';
              } else {
                position = image.position;
              }
              console.log(image.id)
              this.moveToColumn(document.getElementById("pic_"+image.id), position);
            }
          }, 200)
        }
      })
    })

    setTimeout(() => {
      this.fadeOut = true;

      setTimeout(() => {
        this.isLoading = false;


        if(this.portfolioService.currPortfolio!.backgroundImage == null) {
          this.backgroundColor = this.portfolioService.currPortfolio!.color
        } else {
          this.backgroundImageUrl = this.imageService.getDecodedImage(this.portfolioService.currPortfolio!.backgroundImage);
        }
      }, 500);// Dauer der Animation (500ms) sollte mit der CSS-Transition übereinstimmen
    }, 2000);



  }

  moveToColumn(draggedItem: any, targetContainerId: string) {
      const targetElement = document.getElementById(targetContainerId)!;
      // Füge das gezogene Element dem Ziel hinzu
      console.log(targetContainerId + targetElement)
      targetElement.appendChild(draggedItem);
  }

  scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  // Methode, um die aktuell sichtbare Sektion zu setzen
  setActiveSection(section: string) {
    this.activeSection = section;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['cvSection', 'compsSection', 'projectsSection'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          this.setActiveSection(section);
          break;
        }
      }
    }
  }
}
