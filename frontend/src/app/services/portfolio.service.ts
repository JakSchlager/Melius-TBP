import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Portfolio} from "../interfaces/Portfolio";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  currPortfolio: Portfolio | undefined;
  httpClient: HttpClient = inject(HttpClient);
  backgroundColorSubject: Subject<string> = new Subject<string>()

  private readonly url = "http://localhost:8080/portfolio/";

  addPortfolio(portfolio: Portfolio) {
    return this.httpClient.post<Portfolio>(this.url, portfolio);
  }

  updatePortfolio(portfolio: Portfolio) {
    return this.httpClient.put<Portfolio>(this.url, portfolio);
  }

  uploadBackgroundImage(id: number, file: File) {
    const formData = new FormData()

    formData.append('file', file);

    return this.httpClient.patch<FormData>(this.url+id+"/background", formData);
  }

  getPortfolioById(id: number) {
    return this.httpClient.get<Portfolio>(`${this.url}${id}`);
  }

  constructor() {
  }
}
