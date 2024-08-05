import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {LogoutPopupComponent} from "../../popups/logout-popup/logout-popup.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {AppComponent} from "../../app.component";
import {UserRegistrationLoginService} from "../../services/user-registration-login.service";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    MatButton,
    RouterLinkActive,
    MatListItem,
    MatNavList,
    MatDialogClose,
    NgOptimizedImage,
    MatIcon,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',

})
export class SideBarComponent implements OnInit {
  registrationLoginService: UserRegistrationLoginService = inject(UserRegistrationLoginService);
  router: Router = inject(Router);
  hamburgerIconClicked : boolean = false;
  isAnimating: boolean = false;

  openDialog() {
    this.dialogRef.open(LogoutPopupComponent);
  }
  toggleMenu() {
    if (this.hamburgerIconClicked) {
      this.isAnimating = true;
    }
    this.hamburgerIconClicked = !this.hamburgerIconClicked;
  }

  onAnimationEnd() {
    if(!this.hamburgerIconClicked){
      this.isAnimating = false;
    }
  }

  constructor(private dialogRef: MatDialog) {}

  ngOnInit() {
    if(localStorage.getItem("rememberUser") === "true") {

      if(localStorage.getItem("loggedInUser") !== null) {
        this.registrationLoginService.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
      } else {
        this.router.navigate(["/"]);
      }

    } else {
      if(sessionStorage.getItem("loggedInUser") !== null) {
        this.registrationLoginService.loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")!);
      } else {
        this.router.navigate(["/"]);
      }
    }
  }


}
