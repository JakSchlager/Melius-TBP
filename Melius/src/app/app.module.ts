import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {LogoutPopupComponent} from "./logout-popup/logout-popup.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppComponent,
    LogoutPopupComponent
  ],
  providers: [],
})
export class AppModule { }
