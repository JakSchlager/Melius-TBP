import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {LanguageSelectComponent} from "../../single-components/settings/language-select/language-select.component";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    MatIcon,
    LanguageSelectComponent
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {

}
