import {Component, inject} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {LogoutPopupComponent} from "../../popups/logout-popup/logout-popup.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {AppComponent} from "../../app.component";

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
export class SideBarComponent {

  constructor(private router: Router, private dialogRef: MatDialog) {}


  openDialog() {
    this.dialogRef.open(LogoutPopupComponent);
  }

}
