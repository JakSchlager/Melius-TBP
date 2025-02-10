import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PortfolioService} from "../../../services/portfolio.service";

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
export class LanguageSelectComponent implements OnInit {
  portfolioService: PortfolioService = inject(PortfolioService);
  showAvatarOptions: boolean = false
  isAnimating: boolean = false;
  @Output() eventEmitter = new EventEmitter<string>();

  languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  selectedLanguage: any = this.languages[0]; // Deutsch als Standard ausgewählt

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedLanguage = this.languages.find((l) => l.code == this.portfolioService.currPortfolio!.languageCode);
    }, 200)
  }

  selectLanguage(language: any) {
    this.selectedLanguage = language;
    this.eventEmitter.emit(language.code);
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
