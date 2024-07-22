import { Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-projects-area',
  standalone: true,
  imports: [],
  templateUrl: './projects-area.component.html',
  styleUrl: './projects-area.component.css'
})
export class ProjectsAreaComponent {

  protected readonly genRepo = genRepo;
}

// -------------------------------------------
//   Author: Seyon Rajagopal
//   Copyright (c) 2022 Seyon Rajagopal
// -------------------------------------------


// To use a form instead of a specific user comment out the following 2 lines of code:

let user = 'sStieg'; // alternatively, manually enter a different user than yourself using var user = 'alternate_username';



function genRepo(user: string) {
  const testuser = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

  if (testuser.test(user) == false || user == "" || user == null) {
    $("#repo-box").append("<div class='error-box'><h1 class='error-msg'> Sorry the GitHub username appears to be invalid </h1></div>");
  }

  else {

    var requestURL = 'https://api.github.com/users/' + user + '/repos?type=all';
    var request = $.get(requestURL, function () {
    })
      .done(function () {
        request = request.responseJSON;
        if (!Array.isArray(request) || !request.length) {
          $("#repo-box").append("<div class='error-box'><h1 class='error-msg'> Sorry the GitHub username entered has no repos or does't exist </h1></div>");
        }
        else {
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
            $("#repo-box").append("<div class='border-2 w-3/4 m-auto flex flex-col rounded-2xl overflow-hidden'><a href='" + repo_url + "' target='_blank'>" +
                  "<h1 class='text-white bg-gray-900 w-full p-3 font-bold'>" + username + "/" + repo_name + "</h1>" +
                  "<p class='p-3'>" + repo_description + "</p>" +
                  "<div class='p-3'><span class='img' uk-icon='code' class='uk-icon'></span>" + repo_language + "</div> " +
                  "</div>");
          }
        }
      });
  }
}

