import {Component, HostListener, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../../navigation/side-bar/side-bar.component";
import {UserRegistrationData} from "../../interfaces/user-registration-data";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {FormsModule} from "@angular/forms";
import {VERSION} from "@angular/cdk";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SideBarComponent,
    NgIf,
    HomeNavbarComponent,
    NgOptimizedImage,
    RouterOutlet,
    FormsModule,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  isChildRoute: boolean = false;
  registrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);
  showAvatarOptions: boolean = false;
  url: any = '';

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
        console.log(this.url);
      };
    }
  }
  public deleteAvatar() {
    this.url = null;
  }

  triggerFileInput() {
    const fileInput = document.getElementById("fileInput") as HTMLElement;
    fileInput.click();
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Listens for navigation events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {

      // Checks if there's a firstChild route (home/cv, home/projects, home/strengths)
      this.isChildRoute = !!this.route.firstChild;
    });

    // Initial check to see if you are on one of the three subpages
    this.isChildRoute = !!this.route.firstChild;
  }

  showOptions(): void {
    if (!this.showAvatarOptions) {
      this.showAvatarOptions = true;
      return;
    }

    else {
      this.showAvatarOptions = false;
      return;
    }

  }

  protected readonly onscroll = onscroll;
}
