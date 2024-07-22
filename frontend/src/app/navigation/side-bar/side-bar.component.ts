import { Component } from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {LogoutPopupComponent} from "../../popups/logout-popup/logout-popup.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";

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
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',

})
export class SideBarComponent {

  constructor(private router: Router, private dialogRef: MatDialog) {}
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


  openDialog() {
    this.dialogRef.open(LogoutPopupComponent);
  }


  closeMenu() {
    this.router.navigate(['/home'])
  }


}
