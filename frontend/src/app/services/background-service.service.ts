import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackgroundServiceService {
  private backgroundColor = new BehaviorSubject<string>('');
  private backgroundImageUrl = new BehaviorSubject<string | ArrayBuffer | null>(null);

  constructor() { }

  setBackgroundColor(color: string) {
    this.backgroundColor.next(color);
  }

  setBackgroundImageUrl(url: string | ArrayBuffer | null) {
    this.backgroundImageUrl.next(url);
  }

  getBackgroundColor(): Observable<string> {
    return this.backgroundColor.asObservable();
  }
  getBackgroundImageUrl(): Observable<string | ArrayBuffer | null> {
    return this.backgroundImageUrl.asObservable();
  }
}
