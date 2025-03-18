import {Component, inject, OnInit} from '@angular/core';
import {LanguageSelectComponent} from "../../single-components/settings/language-select/language-select.component";
import {ColorPickerModule} from "primeng/colorpicker";
import {
  BackgroundSelectComponent
} from "../../single-components/settings/background-select/background-select.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {PortfolioService} from "../../services/portfolio.service";
import {Router} from "@angular/router";
import {ImageService} from "../../services/image.service";

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
export class SettingsPageComponent implements OnInit {
  router: Router = inject(Router);
  portfolioService: PortfolioService = inject(PortfolioService);
  imageService: ImageService = inject(ImageService);
  isBackgroundSelectionVisible = false;
  isAnimating = false;
  selectedBackgroundColor: string = '';
  selectedBackgroundImage: File | null = null;
  selectedLanguage = this.portfolioService.currPortfolio!.languageCode;

  constructor() {}

  ngOnInit() {
    this.openBackgroundSelection();
  }

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
    this.selectedBackgroundColor = '#f9fafb';
    this.selectedBackgroundImage = null;
  }

  confirmSettings() {
    let portfolio = this.portfolioService.currPortfolio!;
    if (this.selectedBackgroundImage != null) {
      this.portfolioService.uploadBackgroundImage(portfolio.profile.id, this.selectedBackgroundImage).subscribe();
    }

    if(this.selectedLanguage != portfolio.languageCode) {
      portfolio.languageCode = this.selectedLanguage;
    }

    if (this.selectedBackgroundColor != '') {
      portfolio.color = this.selectedBackgroundColor;
      portfolio.backgroundImage = null;
    }

    this.portfolioService.updatePortfolio(portfolio).subscribe();


    this.reloadPage()
  }

  reloadPage() {
    setTimeout(() => {
      this.router.navigate(['/home'])
        .then(() => {
          window.location.reload();
        });
    }, 100);
  }
}
