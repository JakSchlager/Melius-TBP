import { Routes } from '@angular/router';

import {HomePageComponent} from "./pages/home-preview-page/home-page.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {GroupsPageComponent} from "./pages/groups-page/groups-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {CvAreaComponent} from "./pages/home/cv-area/cv-area.component";
import {ProjectsAreaComponent} from "./pages/home/projects-area/projects-area.component";
import {StrengthsAreaComponent} from "./pages/home/strengths-area/strengths-area.component";
import {StartPageComponent} from "./pages/landing-page/start-page.component";
import {CreateOwnGroupComponent} from "./pages/groups_subpages/create-group-form/create-own-group.component";
import {CreatedGroupComponent} from "./pages/groups_subpages/created-group/created-group.component";

export const routes: Routes = [
  {path: "", component: StartPageComponent, title: 'Start Page'},
  {path: "home", component: HomePageComponent, title: 'Home',
    children: [
      {path: "cv", component: CvAreaComponent, title: 'Lebenslauf'},
      {path: "projects", component: ProjectsAreaComponent, title: 'Projekte'},
      {path: "strengths", component: StrengthsAreaComponent, title: 'Stärken'},
    ]
  },

  {path: "groups", component: GroupsPageComponent, title: 'Groups'},
  {path: "groups/myGroup", component: CreatedGroupComponent, title: 'My Group'},
  {path: "settings", component: SettingsPageComponent, title: 'Settings'},
  {path: "**", component: NotFoundComponent, title: 'Nothing Found'},
];
