import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";
import {UserLoginData} from "../interfaces/user-login-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/profile/";
  loggedInUser: User | undefined;


  constructor() { }

  handelUserRegistration(userData: User): Observable<User> {
    let user= this.httpClient.post<User>(this.url + "register", userData);

    if(user !== null) {
      return user;
    } else {
      throw new Error("Benutzer mit dieser Email existiert bereits!");
    }
  }

  handleUserLogin(loginData: UserLoginData): Observable<User> {
    let user = this.httpClient.post<User>(this.url + "login", loginData);

    if(user !== null) {
      return user;
    } else {
      throw new Error("Email oder Passwort sind nicht korrekt!");
    }
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.url + "update", user);
  }
}
