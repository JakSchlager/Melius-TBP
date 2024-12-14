import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.css'
})
export class LanguageSelectComponent {
  showAvatarOptions: boolean = false
  isAnimating: boolean = false;

  languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  selectedLanguage = this.languages[0]; // Deutsch als Standard ausgewählt

  selectLanguage(language: any) {
    this.selectedLanguage = language;
  }

  showOptions(): void {
    if (this.showAvatarOptions) {
      this.isAnimating = true;
    }
    this.showAvatarOptions = !this.showAvatarOptions;
  }

  onAnimationEnd() {
    if(!this.showAvatarOptions){
      this.isAnimating = false;
    }
  }
}
