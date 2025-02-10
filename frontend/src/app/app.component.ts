import {Component, ElementRef, HostListener, inject, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SideBarComponent} from "./navigation/side-bar/side-bar.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {filter} from "rxjs";
import {Profile} from "./interfaces/profile";
import {ProfileService} from "./services/profile.service";
import {PortfolioService} from "./services/portfolio.service";
import {NgIf} from "@angular/common";
import {MatDrawer} from "@angular/material/sidenav";

import {TranslateModule} from "@ngx-translate/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgIf, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  profileService: ProfileService = inject(ProfileService);
  portfolioService: PortfolioService = inject(PortfolioService);

  title = 'Melius-TBP';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
  }

  ngOnInit() {
    if(localStorage.getItem("rememberUser") === "true") {

      if(localStorage.getItem("loggedInUser") !== null) {
        this.profileService.handleUserLogin(JSON.parse(localStorage.getItem("loggedInUser")!)).subscribe({
          next: (user: Profile) => {
            this.profileService.loggedInUser = user;
            console.log(user)

            this.portfolioService.getPortfolioById(user.id).subscribe(portfolio => {
              this.portfolioService.currPortfolio = portfolio;
              this.translate.use(portfolio.languageCode);
              this.portfolioService.backgroundColorSubject.next(portfolio.color);
              console.log(portfolio);
            })
          },
          error: error => {
            localStorage.removeItem("loggedInUser");
            sessionStorage.removeItem("loggedInUser");
            this.router.navigate(["/"]);
          }
        });
      } else {
        this.router.navigate(["/"]);
      }

    } else {
      if(sessionStorage.getItem("loggedInUser") !== null) {
        this.profileService.loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")!);
      } else {
        this.router.navigate(["/"]);
      }
    }
  }

  showSideNavBar(): boolean{
    return this.router.url === '/home' || this.router.url === '/home/cv' || this.router.url === '/home/projects' || this.router.url === '/home/strengths' || this.router.url === '/groups' || this.router.url === '/settings' || this.router.url.includes('/groups/');
  }


}
