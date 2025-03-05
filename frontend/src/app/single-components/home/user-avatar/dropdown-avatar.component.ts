import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgIf, NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "@ngx-translate/core";
import {ProfileService} from "../../../services/profile.service";

@Component({
  selector: 'app-dropdown-avatar',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    TranslatePipe,
    NgStyle
  ],
  templateUrl: './dropdown-avatar.component.html',
  styleUrl: './dropdown-avatar.component.css'
})
export class DropdownAvatarComponent implements OnInit {
  showAvatarOptions: boolean = false
  isAnimating: boolean = false;
  url: string | null = null;
  profileService: ProfileService = inject(ProfileService);

  ngOnInit() {
    //this.url = URL.createObjectURL(this.profileService.loggedInUser!.profileImage!)
    setTimeout(() => {
      if(this.profileService.loggedInUser!.profileImage != undefined){
        /*const blob = new Blob([this.profileService.loggedInUser!.profileImage!], { type: 'image/png' }); // Oder image/jpeg
        const reader = new FileReader();
        reader.onloadend = () => {
          this.url = reader.result as string;
        };
        reader.readAsDataURL(blob);*/

        this.url = "data:image/png;base64," + this.profileService.loggedInUser!.profileImage;
      }
    }, 200)

  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];

      this.profileService.uploadProfileImg(file).subscribe();

      this.reloadPage();

      /*const fileBlob = new Blob([file], { type: file.type });
      fileBlob.arrayBuffer().then(arrayBuffer => {
        // Erstelle ein Uint8Array daraus
        const byteArray = new Uint8Array(arrayBuffer);

        // Erstelle ein Blob aus den Bytes
        const fileBlobForUpload = new Blob([byteArray], { type: file.type });

        console.log(fileBlobForUpload);
        // Upload des Blobs an das Backend
        this.profileService.uploadProfileImg(fileBlobForUpload).subscribe();
      })*/
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

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }
}
