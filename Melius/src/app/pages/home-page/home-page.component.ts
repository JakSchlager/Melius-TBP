import {Component, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../../navigation/side-bar/side-bar.component";
import {UserRegistrationData} from "../../interfaces/user-registration-data";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SideBarComponent,
    NgIf,
    HomeNavbarComponent,
    NgOptimizedImage,
    RouterOutlet
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  isChildRoute: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Listens for navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      // Checks if there's a firstChild route (home/cv, home/projects, home/strengths)
      this.isChildRoute = !!this.route.firstChild;
    });

    // Initial check to see if you are on one of the three suboages
    this.isChildRoute = !!this.route.firstChild;
  }
}
