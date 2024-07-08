import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationLoginService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly registrationURL: string = 'http://localhost:8080/profile/register';

  constructor() { }

  handelUserRegistration(userData: any): Observable<any> {
    return this.httpClient.post(this.registrationURL, userData);

  }

  handleUserLogin(): void {

  }
}
