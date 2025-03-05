import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Profile} from "../interfaces/profile";
import {UserLoginData} from "../interfaces/user-login-data";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/profile/";
  private readonly defaultProfileImg = `./../../assets/icons/no-user-icon.svg`
  loggedInUser: Profile | undefined;


  constructor() { }

  handelUserRegistration(userData: Profile): Observable<Profile> {
    let user= this.httpClient.post<Profile>(this.url + "register", userData);

    if(user !== null) {
      /*fetch(this.defaultProfileImg)
        .then(response => response.blob())
        .then(blob => {
          let file = new File([blob], 'no-user-icon.svg', {type: blob.type});
          this.uploadProfileImg(file)
        })*/

      return user;
    } else {
      throw new Error("Benutzer mit dieser Email existiert bereits!");
    }
  }

  handleUserLogin(loginData: UserLoginData): Observable<Profile> {
    let user = this.httpClient.post<Profile>(this.url + "login", loginData);

    if(user !== null) {
      return user;
    } else {
      throw new Error("Email oder Passwort sind nicht korrekt!");
    }
  }

  updateProfile(profile: Profile) {
    console.log("Updated Profile",profile)
    return this.httpClient.put<Profile>(this.url + "update", profile);
  }

  uploadProfileImg(file: File) {
    const formData = new FormData()

    formData.append('file', file);
    //formData.append('fileName', this.loggedInUser!.lastName);

    return this.httpClient.patch<FormData>(this.url + "img/" + this.loggedInUser!.id, formData)
  }
}
