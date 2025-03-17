import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PortfolioService} from "../../services/portfolio.service";
import {Portfolio} from "../../interfaces/Portfolio";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {DropdownAvatarComponent} from "../../single-components/home/user-avatar/dropdown-avatar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
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


  ngOnInit() {

    const id = Number(this.route.snapshot.params['id']);

    this.portfolioService.getPortfolioById(id).subscribe(portfolio => {
      this.portfolio = portfolio;
    })

    setTimeout(() => {
      this.fadeOut = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500); // Dauer der Animation (500ms) sollte mit der CSS-Transition übereinstimmen
    }, 2000);

    this.generalInfoBox = document.getElementById("generalInfoBox");
    this.educationsBox = document.getElementById("educationsBox");
    this.workExperiencesBox = document.getElementById("workExperiencesBox");
    this.characteristicsBox = document.getElementById("characteristicsBox");
    this.knownLanguagesBox = document.getElementById("knownLanguagesBox");
    this.programmingKnowledgesBox = document.getElementById("programmingKnowledgesBox");
    this.softwareKnowledgesBox = document.getElementById("softwareKnowledgesBox");

    setTimeout(() =>{
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

    if(this.portfolio.ghRepos !== undefined && this.portfolio.ghRepos.length > 0) {
      this.placeRepos();
    }

    this.imageService.getImagesByPortfolioId(this.portfolio.profile.id).subscribe(i => {
      if(i != undefined && i.length != 0 ) {
        this.uploadedFiles = i;
        console.log("Loaded Images", this.uploadedFiles);
        for(let image of this.uploadedFiles) {
          this.moveToColumn(document.getElementById(image.id+""), image.position);
        }
      }
    })

    this.backgroundColor = this.portfolio.color;

    }, 200)

  }

  moveToColumn(draggedItem: any, targetContainerId: string) {
      const targetElement = document.getElementById(targetContainerId)!;
      // Füge das gezogene Element dem Ziel hinzu
      targetElement.appendChild(draggedItem);
  }

  placeRepos() {
    $("#repo-box").html("");
    $("#ghUserForm").remove();
    this.buttonClass = "block"
    for(let currRepos of this.portfolioService.currPortfolio!.ghRepos!) {
      $("#repo-box").append(
        `<div class="w-4/5 m-auto animate-in fade-in zoom-in animation-duration-500 hover:-translate-y-2 duration-300">
                  <div class="w-full flex justify-end">
                    <button class="" (click)="toggleRepo(${currRepos.id})" id="toggle-btn-${currRepos.id}">
                      <svg class='mt-2 mr-2' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#00000">
                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                      </svg>
                    </button>
                  </div>
                  <div id="repo-${currRepos.id}" class="bg-white w-full m-auto flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-custom-shadow duration-150">
                   <div class="flex justify-around bg-gray-900">
                     <h1 id="repo-elements" class='text-white w-full p-3 font-bold'>${currRepos.username}/${currRepos.repoName}</h1>
                   </div>
                   <div class='p-3'>
                     <p>${currRepos.description}</p>
                     <div>${currRepos.language}</div>
                     <button id="repo-link-${currRepos.id}" class='w-1/3 mx-auto my-3 py-2 bg-primary-color rounded-md text-accent-blue flex align-middle justify-center font-bold hover:bg-blue-500 duration-150 ease-in-out'>
                        <a href='${currRepos.url}' target='_blank'>Zum Repo</a>
                     </button>
                   </div>
                 </div>
              </div>`
      );
    }
  }
}
