import {Component, inject, Inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {SettingsPageComponent} from "../../../pages/settings-page/settings-page.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {FormsModule} from "@angular/forms";
import {ToggleButton, ToggleButtonModule} from 'primeng/togglebutton';
import {PortfolioService} from "../../../services/portfolio.service";
import {ImageService} from "../../../services/image.service";

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
export class BackgroundSelectComponent implements OnInit {
  isAnimating: boolean = false;
  selectedColor: string = '#ff0000';
  isStaticColorEnabled: boolean = false;
  isBackgroundPictureEnabled: boolean =false
  portfolioService: PortfolioService = inject(PortfolioService);
  imageService: ImageService = inject(ImageService);
  selectedImage: File | null = null; // Speichert die Bild-URL
  reader = new FileReader();


  constructor(@Inject(SettingsPageComponent) public settingsPage: SettingsPageComponent) {}

  ngOnInit() {
    setTimeout(() => {
      this.activateButton('staticColor');
      this.selectedColor = this.portfolioService.currPortfolio!.color;
      this.apply();
    },200)

  }

  closeBackgroundSelection() {
    this.isAnimating = true; // Animation wird gestartet
    this.settingsPage.isBackgroundSelectionVisible = false;
  }

  onAnimationEnd() {
    this.isAnimating = false; // Animation beendet
  }


  activateButton(type: string): void {
    if (type === 'staticColor') {
      this.isStaticColorEnabled = !this.isStaticColorEnabled;
      if (this.isStaticColorEnabled) {
        this.isBackgroundPictureEnabled = false; // Anderen Button ausschalten
      }

    }
    else if (type === 'backgroundImage') {
      this.isBackgroundPictureEnabled = !this.isBackgroundPictureEnabled;
      if (this.isBackgroundPictureEnabled) {
        this.isStaticColorEnabled = false; // Anderen Button ausschalten
      }
    }
  }


  // File selection for background
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];

      this.selectedImage = file;

    }
  }

  removeSelectedImage(): void {
    this.selectedImage = null;
  }

  apply() {
    if (this.isStaticColorEnabled) {
      this.settingsPage.selectedBackgroundImage = null; // Hintergrundbild zurücksetzen
      this.settingsPage.selectedBackgroundColor = this.selectedColor;
    }

    else if (this.isBackgroundPictureEnabled && this.selectedImage) {
      this.settingsPage.selectedBackgroundColor = ''; // Hintergrundfarbe zurücksetzen
      this.settingsPage.selectedBackgroundImage = this.selectedImage;
    }
  }

}
