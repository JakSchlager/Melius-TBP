import {Component, HostListener, Inject, inject, OnInit} from '@angular/core';
import {SideBarComponent} from "../../navigation/side-bar/side-bar.component";
import {Profile} from "../../interfaces/profile";
import {ProfileService} from "../../services/profile.service";
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {FormsModule} from "@angular/forms";
import {VERSION} from "@angular/cdk";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {DropdownAvatarComponent} from "../../single-components/home/user-avatar/dropdown-avatar.component";
import {BackgroundServiceService} from "../../services/background-service.service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home-preview-page',
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
    MatMenuTrigger,
    NgClass,
    DropdownAvatarComponent,
    RouterLink,
    NgStyle,
    TranslatePipe
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  isChildRoute: boolean = false;
  profileService: ProfileService = inject(ProfileService);
  newBackgroundColor: string = '';
  newBackgroundImageUrl: string | ArrayBuffer | null = null;

  /*
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
*/
  constructor(private route: ActivatedRoute, private router: Router, private backgroundService: BackgroundServiceService) {}

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

    this.backgroundService.getBackgroundColor().subscribe(color => {
      this.newBackgroundColor = color;
    });

    this.backgroundService.getBackgroundImageUrl().subscribe(imageUrl => {
      this.newBackgroundImageUrl = imageUrl;
    })
  }


  protected readonly onscroll = onscroll;
}
