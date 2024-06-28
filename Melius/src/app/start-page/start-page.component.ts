import { Component } from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {
  isLoginClicked: boolean = false;


  clickedLogin() {
    this.isLoginClicked = true;
  }

}
