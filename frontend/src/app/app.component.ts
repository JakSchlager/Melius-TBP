import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SideBarComponent} from "./navigation/side-bar/side-bar.component";
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
  title = 'Melius-TBP';
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('de');
    this.translate.use('de');
  }

  ngOnInit() {

  }

  showSideNavBar(): boolean{
    return this.router.url === '/home' || this.router.url === '/home/cv' || this.router.url === '/home/projects' || this.router.url === '/home/strengths' || this.router.url === '/groups' || this.router.url === '/settings' || this.router.url === '/groups/myGroup';
  }


}
