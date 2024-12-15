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
  selectedImageUrl: string | ArrayBuffer | null = null; // Speichert die Bild-URL


  constructor(@Inject(SettingsPageComponent) public settingsPage: SettingsPageComponent) {}

  closeBackgroundSelection() {
    this.isAnimating = true; // Animation wird gestartet
    this.settingsPage.isBackgroundSelectionVisible = false;
  }

  onAnimationEnd() {
    this.isAnimating = false; // Animation beendet
  }


  // Static color selection for background
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


  // File selection for background
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file: File = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImageUrl = reader.result; // Speichert die Base64-URL des Bildes
      };

      reader.readAsDataURL(file); // Liest die Datei als DataURL
    }
  }

  removeSelectedImage(): void {
    this.selectedImageUrl = null;
  }

  apply() {
    if (this.isStaticColorEnabled) {
      this.settingsPage.selectedBackgroundImageUrl = null; // Hintergrundbild zurücksetzen
      this.settingsPage.selectedBackgroundColor = this.selectedColor;
    } else if (this.isBackgroundPictureEnabled && this.selectedImageUrl) {
      this.settingsPage.selectedBackgroundColor = ''; // Hintergrundfarbe zurücksetzen
      this.settingsPage.selectedBackgroundImageUrl = this.selectedImageUrl;
    }
  }

}
