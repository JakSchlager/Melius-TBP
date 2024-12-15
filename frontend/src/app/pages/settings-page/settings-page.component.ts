import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {LanguageSelectComponent} from "../../single-components/settings/language-select/language-select.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {
  BackgroundSelectComponent
} from "../../single-components/settings/background-select/background-select.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    MatIcon,
    LanguageSelectComponent,
    ColorPickerModule,
    BackgroundSelectComponent,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  isBackgroundSelectionVisible = false; // Steuert die Sichtbarkeit des Menüs
  isAnimating = false; // Steuert die Animation
  selectedBackgroundColor: string = '';
  selectedBackgroundImageUrl: string | ArrayBuffer | null = null;

  openBackgroundSelection() {
    this.isAnimating = true; // Animation beginnt
    this.isBackgroundSelectionVisible = true; // Menü wird sichtbar
  }

  onAnimationEnd() {
    if (!this.isBackgroundSelectionVisible) {
      this.isAnimating = false; // Animation beendet
    }
  }

  removeBackgroundSelection() {
    this.selectedBackgroundColor = '#ffffff';
    this.selectedBackgroundImageUrl = null;
  }
}
