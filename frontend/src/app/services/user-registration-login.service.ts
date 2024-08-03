import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRegistrationData} from "../interfaces/user-registration-data";
import {UserLoginData} from "../interfaces/user-login-data";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationLoginService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly registrationURL: string = 'http://localhost:8080/profile/register';
  private readonly loginURL: string = 'http://localhost:8080/profile/login';
  loggedInUser: UserRegistrationData | undefined;


  constructor() { }

  handelUserRegistration(userData: UserRegistrationData): Observable<UserRegistrationData> {
    let user= this.httpClient.post<UserRegistrationData>(this.registrationURL, userData);

    if(user !== null) {
      return user;
    } else {
      throw new Error("Benutzer mit dieser Email existiert bereits!");
    }
  }

  handleUserLogin(loginData: UserLoginData): Observable<UserRegistrationData> {
    let user = this.httpClient.post<UserRegistrationData>(this.loginURL, loginData);

    if(user !== null) {
      return user;
    } else {
      throw new Error("Email oder Passwort sind nicht korrekt!");
    }
  }
}
