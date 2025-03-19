import {Component, inject, OnInit} from '@angular/core';
import $ from 'jquery';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../../services/portfolio.service";
import {GHRepo} from "../../../interfaces/GHRepo";
import {GhReposService} from "../../../services/gh-repos.service";
import {ImageService} from "../../../services/image.service";
import {Image} from "../../../interfaces/image";


@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgClass,
    TranslatePipe
  ],
  templateUrl: './projects-area.component.html',
  styleUrl: './projects-area.component.css'
})
export class ProjectsAreaComponent implements OnInit {
  filesToUpload: File[] = [];
  selectedFiles: { name: string, url: string }[] = [];
  uploadedFiles: Image[] = [];
  uploadBtnClicked: boolean = false;
  router: Router = inject(Router);
  portfolioService: PortfolioService = inject(PortfolioService);
  imageService: ImageService = inject(ImageService);
  ghRepoService: GhReposService = inject(GhReposService);
  buttonClass = "hidden"
  showGhTitle: string = "";

  ngOnInit() {
    setTimeout(() => {
      if(this.portfolioService.currPortfolio!.ghRepos != undefined && this.portfolioService.currPortfolio!.ghRepos!.length > 0) {
        this.placeRepos();
      }

      this.imageService.getImagesByPortfolioId(this.portfolioService.currPortfolio!.profile.id).subscribe(i => {
        if(i != undefined && i.length != 0 ) {
          this.uploadBtnClicked = true;
          this.uploadedFiles = i;

          setTimeout(() => {
            for(let image of this.uploadedFiles) {
              this.moveImage(image.id, image.position);
            }
          }, 200)

        }
      })


    }, 200)
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    console.log(event.target.files)
    for (let file of files) {
      if (this.isValidFile(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filesToUpload.push(file);
        this.selectedFiles.push({
          name: file.name,
          url: e.target.result
        });
      };
      reader.readAsDataURL(file);
      }
      else {
        alert('Only JPEG, PNG and PDF files are allowed.')
      }
    }
  }

  isValidFile(file: any): boolean {
    const fileType = file.type;
    return (
      fileType === 'image/jpeg' ||
      fileType === 'image/jpg' ||
      fileType === 'image/png' ||
      fileType === 'application/pdf'
    )
  }

  isPdf(url: string): boolean {
    return url.includes('application/pdf');
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles() {
    for(let file of this.filesToUpload) {
      this.imageService.uploadToPortfolio(this.portfolioService.currPortfolio!.profile!.id, file, "firstFileProjectCol").subscribe()
    }

    this.reloadPage();

  }

  removeSpecificFile(id: number) {
    this.imageService.deleteImage(id).subscribe();
  }

  ghUserForm = new FormGroup( {
    username: new FormControl('', [Validators.required]),
    submit: new FormControl('', [])
  })

  // Drag and Drop functionality

  draggedItem: any;
  allowDrag: boolean = false;

  // Wird ausgelöst, wenn das Ziehen beginnt
  onDragStart(event: DragEvent, item: any) {
    if (this.allowDrag) {
      this.draggedItem = item;
      event.dataTransfer?.setData('text/plain', event.target?.toString() || '');
    }
    else {
      event.stopPropagation();
    }
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

      this.imageService.updateImage(this.draggedItem.id, targetContainerId).subscribe();

      this.draggedItem = null;
    }
  }

  placeRepos() {
    $("#repo-box").html("");
    $("#ghUserForm").remove();
    this.buttonClass = "block"
    for(let currRepos of this.portfolioService.currPortfolio!.ghRepos!) {
      $("#repo-box").append(
        `<div class="w-4/5 m-auto animate-in fade-in zoom-in animation-duration-500 hover:-translate-y-2 duration-300">
                  <div class="w-full flex justify-end">

                  </div>
                  <div id="repo-${currRepos.id}" class="bg-white w-full m-auto flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-custom-shadow duration-150">
                   <div class="flex justify-around bg-gray-100">
                     <h1 id="repo-elements" class='text-gray-800 w-full p-3 font-bold'>${currRepos.username}/${currRepos.repoName}</h1>
                   </div>
                   <div class='p-3'>
                     <p>${currRepos.description}</p>
                     <div>${currRepos.language}</div>
                     <button id="repo-link-${currRepos.id}" class='p-1.5 mx-auto my-3 bg-primary-color rounded-lg text-accent-blue flex align-middle justify-center font-bold hover:bg-blue-500 duration-150 ease-in-out'>
                        <a href='${currRepos.url}' target='_blank'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                            </svg>
                        </a>
                     </button>
                   </div>
                 </div>
              </div>`
      );
    }
  }

  // Hier werden die github repositories herausgefiltert und gestyled
  getRepos(user: string) {
    var requestURL = 'https://api.github.com/users/' + user + '/repos?type=all';
    var request = $.get(requestURL, function () { })
      .done(() => {
        request = request.responseJSON;
        if (!Array.isArray(request) || !request.length) {
          $("#repo-box").html(`<div class='error-box'><h1 class='error-msg'> Dieser GitHub Benutzername existiert nicht. Bitte gib deinen eigenen GitHub Benutzernamen an! </h1></div>`);
        } else {
          let repos: GHRepo[] = [];
          request.forEach((repo: any, index: number) => {
            repos.push({
              id: 0,
              description: repo.description || "No Description",
              language: repo.language || "-",
              repoName: repo.name,
              url: repo.html_url,
              username: repo.owner.login,
              portfolio: this.portfolioService.currPortfolio!
            })
          });
          console.log(repos);
          this.ghRepoService.addAllRepos(repos).subscribe()
          this.reloadPage();
        }
      });
  }

  /*setGithubUser(username: string) {
    let profile: Profile = this.profileService.loggedInUser!;
    profile.githubUser = username;

    this.profileService.updateProfile(profile).subscribe();

    this.getRepos(username);
  }*/

  deleteGithubUser() {
    this.ghRepoService.deleteAllRepos(this.portfolioService.currPortfolio!.profile.id).subscribe();
    this.reloadPage()
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  moveImage(id: number, position: string) {
    this.draggedItem = document.getElementById(id+"");

    console.log(this.draggedItem)
    this.onDrop(new DragEvent("drag"), position);
  }
}


// Hier ist die konfiguration für den Blur effekt auf die Repositories, welcher entweder aktiviert oder deaktiviert werden kann
declare var window: any;
window.toggleRepo = function (index: number) {
  const repoElement = document.getElementById(`repo-${index}`);
  const toggleBtn = document.getElementById(`toggle-btn-${index}`);
  const repoLinkButton = document.getElementById(`repo-link-${index}`);

  if (repoElement && toggleBtn && repoLinkButton) {
    repoElement.classList.toggle('blur-sm');
    repoLinkButton.classList.toggle('cursor-not-allowed');
    if (repoElement.classList.contains('blur-sm')) {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      `;
      repoLinkButton.innerHTML = `
        <a class="" href='${this.repo_url}' target='_blank'>Zum Repo</a>
      `
    } else {
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      `;
    }
  }
}
