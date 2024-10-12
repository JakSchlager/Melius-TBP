import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgIf} from "@angular/common";
import {HomePageComponent} from "../../pages/home-preview-page/home-page.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dropdown-avatar',
  standalone: true,
  imports: [
    MatIcon,
    NgIf,
    FormsModule,
    NgClass
  ],
  templateUrl: './dropdown-avatar.component.html',
  styleUrl: './dropdown-avatar.component.css'
})
export class DropdownAvatarComponent {
  showAvatarOptions: boolean = false
  isAnimating: boolean = false;
  url: any = '';

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // @ts-ignore
        this.url = event.target.result;
        console.log(this.url);
      };
    }
  }
  public deleteAvatar() {
    this.url = null;
  }

  triggerFileInput() {
    const fileInput = document.getElementById("fileInput") as HTMLElement;
    fileInput.click();
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
