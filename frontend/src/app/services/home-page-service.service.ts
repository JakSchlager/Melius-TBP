import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageServiceService {
  isBoxDraggable: boolean = false;

  constructor() { }

  changeBoxDrag(check : boolean) {
    this.isBoxDraggable = check;
  }
}
