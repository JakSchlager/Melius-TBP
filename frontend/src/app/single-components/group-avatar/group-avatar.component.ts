import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-group-avatar',
  standalone: true,
  imports: [
    NgIf,
    PaginatorModule,
    NgClass
  ],
  templateUrl: './group-avatar.component.html',
  styleUrl: './group-avatar.component.css'
})
export class GroupAvatarComponent {
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
