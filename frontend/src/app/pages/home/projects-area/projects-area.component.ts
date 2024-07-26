import { Component } from '@angular/core';
import $ from 'jquery';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Octokit} from "@octokit/core";

@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './projects-area.component.html',
  styleUrl: './projects-area.component.css'
})
export class ProjectsAreaComponent {

  protected readonly genRepo = genRepo;

  ghUserForm = new FormGroup( {
    username: new FormControl('', [Validators.required]),
    submit: new FormControl('', [])
  })
}

function genRepo(user: string) {

  var requestURL = 'https://api.github.com/users/' + user + '/repos?type=all';
  var request = $.get(requestURL, function () {
  })
    .done(function () {
      request = request.responseJSON;
      if (!Array.isArray(request) || !request.length) {
        $("#repo-box").html("<div class='error-box'><h1 class='error-msg'> Dieser GitHub Benutzername existiert nicht. Bitte gib deinen eigenen GitHub Benutzernamen an! </h1></div>");
      } else {
        $("#repo-box").html("");
        $("#ghUserForm").remove();
        for (let i = 0; i < request.length; i++) {
          // variables from api request
          var repo_url = request[i].html_url;
          var username = request[i].owner.login;
          var repo_name = request[i].name;
          var repo_description = request[i].description;
          var repo_language = request[i].language;
          var repo_stars = request[i].stargazers_count;
          var repo_forks = request[i].forks;


          // replaces null values to be better represented when displayed
          if (repo_description == null) {
            repo_description = "<i>No Description</i>";
          }
          if (repo_language == null) {
            repo_language = "-";
          }

          // Puts repo information into div
          $("#repo-box").append("<div class='w-3/4 m-auto flex flex-col rounded-2xl overflow-hidden shadow-custom-shadow'>" +
            "<h1 class='text-white bg-gray-900 w-full p-3 font-bold'>" + username + "/" + repo_name + "</h1>" +
            "<p class='p-3'>" + repo_description + "</p>" +
            "<div class='p-3'><span class='img' uk-icon='code' class='uk-icon'></span>" + repo_language + "</div> " +
            "<a class='w-1/3 mx-auto my-3 py-2 bg-gray-900 rounded-md text-white flex align-middle justify-center font-bold hover:bg-gray-300 hover:text-black duration-150 ease-in-out' href='" + repo_url + "' target='_blank'>Zum Repo</a>" +
            "</div>");
        }
      }
    });
}

/*var file: HTMLInputElement | null = <HTMLInputElement> document.getElementById('file');

file!.onchange = function(e) {
  var ext = file!.value.match(/\.([^\.]+)$/)[1];
  switch (ext) {
    case 'jpg':
    case 'bmp':
    case 'png':
    case 'tif':
      alert('Allowed');
      break;
    default:
      alert('Not allowed');
      this.value = '';
  }
};*/

