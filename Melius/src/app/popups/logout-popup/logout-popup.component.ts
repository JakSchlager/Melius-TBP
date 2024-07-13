import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatLabel} from "@angular/material/form-field";

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
    MatLabel
  ],
  templateUrl: './logout-popup.component.html',
  styleUrl: './logout-popup.component.css'
})
export class LogoutPopupComponent implements OnInit{
  ngOnInit(): void {
  }


}
