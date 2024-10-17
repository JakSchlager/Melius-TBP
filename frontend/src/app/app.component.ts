import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SideBarComponent} from "./navigation/side-bar/side-bar.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgIf, MatDrawerContent, MatIcon, MatDrawerContainer, MatButton, MatDrawer, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Melius-TBP';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router) {}

  ngOnInit() {

  }

  showSideNavBar(): boolean{
    return this.router.url === '/home' || this.router.url === '/home/cv' || this.router.url === '/home/projects' || this.router.url === '/home/strengths' || this.router.url === '/groups' || this.router.url === '/settings';
  }

}
