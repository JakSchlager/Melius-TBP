import {Component, ElementRef, signal, ViewChild} from '@angular/core';
import $ from 'jquery';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatIcon,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './projects-area.component.html',
  styleUrl: './projects-area.component.css'
})
export class ProjectsAreaComponent {
  selectedFiles: { name: string, url: string }[] = [];
  uploadedFiles: { name: string, url: string }[] = [];
  uploadBtnClicked: boolean = false;

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
    this.uploadedFiles.slice(index);
  }

  ghUserForm = new FormGroup( {
    username: new FormControl('', [Validators.required]),
    submit: new FormControl('', [])
  })

  // Hier werden die github repositories herausgefiltert und gestyled
  genRepo(user: string) {
    var requestURL = 'https://api.github.com/users/' + user + '/repos?type=all';
    var request = $.get(requestURL, function () { })
      .done(() => {
        request = request.responseJSON;
        if (!Array.isArray(request) || !request.length) {
          $("#repo-box").html("<div class='error-box'><h1 class='error-msg'> Dieser GitHub Benutzername existiert nicht. Bitte gib deinen eigenen GitHub Benutzernamen an! </h1></div>");
        } else {
          $("#repo-box").html("");
          $("#ghUserForm").remove();
          request.forEach((repo: any, index: number) => {
            var repo_url = repo.html_url;
            var username = repo.owner.login;
            var repo_name = repo.name;
            var repo_description = repo.description || "<i>No Description</i>";
            var repo_language = repo.language || "-";
            var repo_stars = repo.stargazers_count;
            var repo_forks = repo.forks;

            $("#repo-box").append(
              `<div class="w-4/5 m-auto animate-in fade-in zoom-in animation-duration-500 hover:-translate-y-2 duration-300">
                <div class="w-full flex justify-end">
                  <button class="" onclick="toggleRepo(${index})" id="toggle-btn-${index}">
                    <svg class='mt-2 mr-2' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#00000">
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                    </svg>
                  </button>
                </div>
                <div id="repo-${index}" class="w-full m-auto flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-custom-shadow duration-150">
                 <div class="flex justify-around bg-gray-900">
                   <h1 id="repo-elements" class='text-white w-full p-3 font-bold'>${username}/${repo_name}</h1>
                 </div>
                 <div class='p-3'>
                   <p>${repo_description}</p>
                   <div>${repo_language}</div>
                   <button id="repo-link-${index}" class='w-1/3 mx-auto my-3 py-2 bg-gray-900 rounded-md text-white flex align-middle justify-center font-bold hover:bg-gray-300 hover:text-black duration-150 ease-in-out'>
                      <a href='${repo_url}' target='_blank'>Zum Repo</a>
                   </button>
                 </div>
               </div>
              </div>`
            );
          });

        }
      });
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
    repoLinkButton.classList.add('disabled');
    repoLinkButton.setAttribute('disabled', 'true');
    if (repoElement.classList.contains('blur-sm')) {
      toggleBtn.innerHTML = `
        <svg class="mt-2 mr-2" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#00000">
          <path d="M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
        </svg>
      `;
    } else {
      toggleBtn.innerHTML = `
        <svg class="mt-2 mr-2" xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#00000">
          <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
        </svg>
      `;
    }
  }
};
