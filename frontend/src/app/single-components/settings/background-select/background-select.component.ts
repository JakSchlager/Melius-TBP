import {Component, Inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SettingsPageComponent} from "../../../pages/settings-page/settings-page.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-background-select',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    ColorPickerModule,
    FormsModule
  ],
  templateUrl: './background-select.component.html',
  styleUrl: './background-select.component.css'
})
export class BackgroundSelectComponent {
  isAnimating: boolean = false;
  selectedColor: string = '#ff0000';
  isStaticColorEnabled: boolean = false;
  usedBackgrounds = [1, 2, 3, 4];
  background: any;

  constructor(@Inject(SettingsPageComponent) public settingsPage: SettingsPageComponent) {}

  closeBackgroundSelection() {
    this.isAnimating = true; // Animation wird gestartet
    this.settingsPage.isBackgroundSelectionVisible = false;
  }

  apply() {
    if (this.isStaticColorEnabled) {
      this.settingsPage.selectedBackgroundColor = this.selectedColor;

    }
  }

  toggleCheckbox(checkboxType: string) {
    // Setzt alle Checkboxen zurück und aktiviert nur die aktuelle
    if (checkboxType === 'staticColor') {
      this.isStaticColorEnabled = true;
      // Hier könnten weitere Checkboxen deaktiviert werden
    }
  }

  onAnimationEnd() {
    this.isAnimating = false; // Animation beendet
  }

}
