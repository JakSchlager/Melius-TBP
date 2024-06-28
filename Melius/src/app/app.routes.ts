import { Routes } from '@angular/router';import {AppComponent} from "./app.component";
import {StartPageComponent} from "./start-page/start-page.component";

export const routes: Routes = [{
  path: '', component: StartPageComponent, title: 'Start Page'
}];
