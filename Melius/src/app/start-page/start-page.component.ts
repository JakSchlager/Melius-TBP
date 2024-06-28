import { Component } from '@angular/core';
import {LoginFormComponent} from "../login-form/login-form.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    LoginFormComponent,
    NgOptimizedImage
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.css'
})
export class StartPageComponent {

}
