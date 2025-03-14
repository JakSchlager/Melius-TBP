import {Component, inject, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {NgClass, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {HomeNavbarComponent} from "../../navigation/home-navbar/home-navbar.component";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {BehaviorSubject, filter} from "rxjs";
import {FormsModule} from "@angular/forms";
import {DropdownAvatarComponent} from "../../single-components/home/user-avatar/dropdown-avatar.component";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../services/portfolio.service";

@Component({
  selector: 'app-home-preview-page',
  standalone: true,
  imports: [
    NgIf,
    HomeNavbarComponent,
    NgOptimizedImage,
    RouterOutlet,
    FormsModule,
    DropdownAvatarComponent,
    RouterLink,
    NgStyle,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  portfolioService: PortfolioService = inject(PortfolioService);
  isChildRoute: boolean = false;
  profileService: ProfileService = inject(ProfileService);
  newBackgroundColor!: string;
  newBackgroundImageUrl: string | ArrayBuffer | null = null;

  isLoading: boolean = true;
  fadeOut: boolean = false;

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



    /*this.backgroundService.getBackgroundImageUrl().subscribe(imageUrl => {
      this.newBackgroundImageUrl = imageUrl;
    })*/

    setTimeout(() => {

      this.newBackgroundColor = this.portfolioService.currPortfolio!.color
    }, 200)

    setTimeout(() => {
      this.fadeOut = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500); // Dauer der Animation (500ms) sollte mit der CSS-Transition übereinstimmen
    }, 2000);

  }


  protected readonly onscroll = onscroll;
}
