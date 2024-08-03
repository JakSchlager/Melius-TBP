import {Component, inject, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {MatLabel} from "@angular/material/form-field";
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-logout-popup',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogClose,
    RouterLink,
    MatLabel,
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent {
  router: Router = inject(Router);

  logOut() {
    localStorage.removeItem("loggedInUser");
    this.router.navigate([""]);
  }

}
