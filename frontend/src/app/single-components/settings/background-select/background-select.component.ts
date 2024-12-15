import {Component, Inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SettingsPageComponent} from "../../../pages/settings-page/settings-page.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule} from "@angular/forms";
import {ToggleButton, ToggleButtonModule} from 'primeng/togglebutton';

@Component({
  selector: 'app-background-select',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    ColorPickerModule,
    FormsModule,
    ToggleButtonModule
  ],
  templateUrl: './background-select.component.html',
  styleUrl: './background-select.component.css'
})
export class BackgroundSelectComponent {
  isAnimating: boolean = false;
  selectedColor: string = '#ff0000';
  isStaticColorEnabled: boolean = false;
  isBackgroundPictureEnabled: boolean =false

  constructor(@Inject(SettingsPageComponent) public settingsPage: SettingsPageComponent) {}

  closeBackgroundSelection() {
    this.isAnimating = true; // Animation wird gestartet
    this.settingsPage.isBackgroundSelectionVisible = false;
  }

  onAnimationEnd() {
    this.isAnimating = false; // Animation beendet
  }

  apply() {
    if (this.isStaticColorEnabled) {
      this.settingsPage.selectedBackgroundColor = this.selectedColor;
    }
  }

  activateButton(type: string): void {
    if (type === 'staticColor') {
      // Zustand toggeln: Wenn bereits aktiv, ausschalten, ansonsten einschalten
      this.isStaticColorEnabled = !this.isStaticColorEnabled;
      if (this.isStaticColorEnabled) {
        this.isBackgroundPictureEnabled = false; // Anderen Button ausschalten
      }
    } else if (type === 'backgroundImage') {
      this.isBackgroundPictureEnabled = !this.isBackgroundPictureEnabled;
      if (this.isBackgroundPictureEnabled) {
        this.isStaticColorEnabled = false; // Anderen Button ausschalten
      }
    }
  }


}
