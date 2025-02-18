import {Component, inject, OnInit} from '@angular/core';
import $ from 'jquery';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../../services/portfolio.service";
import {GHRepo} from "../../../interfaces/GHRepo";
import {GhReposService} from "../../../services/gh-repos.service";


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
  selectedFiles: { name: string, url: string }[] = [];
  uploadedFiles: { name: string, url: string }[] = [];
  uploadBtnClicked: boolean = false;
  router: Router = inject(Router);
  portfolioService: PortfolioService = inject(PortfolioService);
  ghRepoService: GhReposService = inject(GhReposService);
  buttonClass = "hidden"
  showGhTitle: string = "";

  ngOnInit() {
    setTimeout(() => {
      if(this.portfolioService.currPortfolio!.ghRepos != undefined && this.portfolioService.currPortfolio!.ghRepos!.length > 0) {
        this.placeRepos();
      }
    }, 200)
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let file of files) {
      if (this.isValidFile(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
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
    this.uploadBtnClicked = true;
    this.uploadedFiles = this.uploadedFiles.concat(this.selectedFiles);
    this.selectedFiles = [];
  }

  removeSpecificFile(index: number) {
    this.uploadedFiles.splice(index, 1);
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


            /*$("#repo-box").append(
               `<div class="w-4/5 m-auto animate-in fade-in zoom-in animation-duration-500 hover:-translate-y-2 duration-300">
                  <div class="w-full flex justify-end">
                    <button class="" (click)="toggleRepo(${index})" id="toggle-btn-${index}">
                      <svg class='mt-2 mr-2' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#00000">
                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                      </svg>
                    </button>
                  </div>
                  <div id="repo-${index}" class="bg-white w-full m-auto flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-custom-shadow duration-150">
                   <div class="flex justify-around bg-gray-900">
                     <h1 id="repo-elements" class='text-white w-full p-3 font-bold'>${username}/${repo_name}</h1>
                   </div>
                   <div class='p-3'>
                     <p>${repo_description}</p>
                     <div>${repo_language}</div>
                     <button id="repo-link-${index}" class='w-1/3 mx-auto my-3 py-2 bg-primary-color rounded-md text-accent-blue flex align-middle justify-center font-bold hover:bg-blue-500 duration-150 ease-in-out'>
                        <a href='${repo_url}' target='_blank'>Zum Repo</a>
                     </button>
                   </div>
                 </div>
              </div>`
            );*/
          });

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
