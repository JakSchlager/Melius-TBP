import { Routes } from '@angular/router';import {AppComponent} from "./app.component";
import {StartPageComponent} from "./start-page/start-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  {path: "", component: StartPageComponent, title: 'Start Page'},
  {path: "home", component: HomePageComponent, title: 'Home'},
  {path: "**", component: NotFoundComponent, title: 'Nothing Found'},
];
