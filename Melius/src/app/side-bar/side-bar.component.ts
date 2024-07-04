import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {LogoutPopupComponent} from "../logout-popup/logout-popup.component";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    MatButton,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',

})
export class SideBarComponent {
  hamburgerIconClicked : boolean = false;
  /*
    constructor(public dialog: MatDialog) {}

    openLogoutPopup() {
      const dialogRef = this.dialog.open(LogoutPopupComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('User confirmed logout');
        } else {
          console.log('User cancelled logout');
        }
      });
    }

    */

  constructor(private dialogRef: MatDialog) {
  }
  openDialog() {
    this.dialogRef.open(LogoutPopupComponent);
  }

  openMenu() {
    this.hamburgerIconClicked = true;
  }

  closeMenu() {
    this.hamburgerIconClicked = false;
  }


}
