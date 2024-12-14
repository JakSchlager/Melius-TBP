import {Component, Inject} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SettingsPageComponent} from "../../../pages/settings-page/settings-page.component";

@Component({
  selector: 'app-background-select',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './background-select.component.html',
  styleUrl: './background-select.component.css'
})
export class BackgroundSelectComponent {
  isAnimating: boolean = false;
  usedBackgrounds = [1, 2, 3, 4];

  constructor(@Inject(SettingsPageComponent) public settingsPage: SettingsPageComponent) {}

  closeBackgroundSelection() {
    this.isAnimating = true; // Animation wird gestartet
    this.settingsPage.isBackgroundSelectionVisible = false;
  }

  onAnimationEnd() {
    this.isAnimating = false; // Animation beendet
  }

}
