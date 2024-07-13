import { Routes } from '@angular/router';import {AppComponent} from "./app.component";
import {StartPageComponent} from "./pages/start-page/start-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {GroupsPageComponent} from "./pages/groups-page/groups-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {CvAreaComponent} from "./pages/home/cv-area/cv-area.component";

export const routes: Routes = [
  {path: "", component: StartPageComponent, title: 'Start Page'},
  {path: "home", component: HomePageComponent, title: 'Home', },
  {path: "home/cv", component: CvAreaComponent, title: 'Lebenslauf'},
  {path: "home/projects", component: CvAreaComponent, title: 'Projekte'},
  {path: "home/strengths", component: CvAreaComponent, title: 'Stärken'},
  {path: "groups", component: GroupsPageComponent, title: 'Groups'},
  {path: "settings", component: SettingsPageComponent, title: 'Settings'},
  {path: "**", component: NotFoundComponent, title: 'Nothing Found'},
];
