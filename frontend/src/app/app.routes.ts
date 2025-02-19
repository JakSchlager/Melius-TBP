import { Routes } from '@angular/router';

import {HomePageComponent} from "./pages/home-preview-page/home-page.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {GroupsPageComponent} from "./pages/groups-page/groups-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {CvAreaComponent} from "./pages/home/cv-area/cv-area.component";
import {ProjectsAreaComponent} from "./pages/home/projects-area/projects-area.component";
import {StrengthsAreaComponent} from "./pages/home/strengths-area/strengths-area.component";
import {StartPageComponent} from "./pages/landing-page/start-page.component";
import {PortfolioViewComponent} from "./pages/portfolio-view/portfolio-view.component";
import {GroupDetailComponent} from "./pages/groups_subpages/group-detail-admin/group-detail.component";
import {GroupDetailGuestComponent} from "./pages/groups_subpages/group-detail-guest/group-detail-guest.component";

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
  {path: "groups/:id", component: GroupDetailComponent, title: 'My Group'},
  /* TODO: Gescheite Benennung... */
  {path: "groups/stranger/:id", component: GroupDetailGuestComponent, title: 'Strangers Group'},
  {path: "settings", component: SettingsPageComponent, title: 'Settings'},
  {path: "portfolio/:id", component: PortfolioViewComponent, title: 'Portfolio'},
  {path: "**", component: NotFoundComponent, title: 'Nothing Found'},
];
