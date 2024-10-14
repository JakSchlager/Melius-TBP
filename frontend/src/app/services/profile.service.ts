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
  loggedInUser: Profile | undefined;


  constructor() { }

  handelUserRegistration(userData: Profile): Observable<Profile> {
    let user= this.httpClient.post<Profile>(this.url + "register", userData);

    if(user !== null) {
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
    return this.httpClient.patch<Profile>(this.url + "update", profile);
  }
}
