import {ChangeDetectorRef, Component} from '@angular/core';
import {LanguageSelectComponent} from "../../single-components/settings/language-select/language-select.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {
  BackgroundSelectComponent
} from "../../single-components/settings/background-select/background-select.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {BackgroundServiceService} from "../../services/background-service.service";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    LanguageSelectComponent,
    ColorPickerModule,
    BackgroundSelectComponent,
    NgIf,
    NgClass,
    NgStyle,
    TranslatePipe,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  isBackgroundSelectionVisible = false;
  isAnimating = false;
  selectedBackgroundColor: string = '';
  selectedBackgroundImageUrl: string | ArrayBuffer | null = null;


  constructor(private cd: ChangeDetectorRef, private backgroundService: BackgroundServiceService) {}

  openBackgroundSelection() {
    this.isAnimating = true;
    this.isBackgroundSelectionVisible = true;
  }

  onAnimationEnd() {
    if (!this.isBackgroundSelectionVisible) {
      this.isAnimating = true;
    }
  }

  removeBackgroundSelection() {
    this.selectedBackgroundColor = '';
    this.selectedBackgroundImageUrl = null;
  }

  confirmSettings() {
    if (this.selectedBackgroundImageUrl != null) {
      this.backgroundService.setBackgroundColor('');
      this.backgroundService.setBackgroundImageUrl(this.selectedBackgroundImageUrl);
    }

    if (this.selectedBackgroundColor != '') {
      this.backgroundService.setBackgroundImageUrl(null);
      this.backgroundService.setBackgroundColor(this.selectedBackgroundColor);
    }

    this.cd.detectChanges();
  }
}
