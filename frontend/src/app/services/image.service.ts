import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/images/";

  constructor() { }

  uploadToPortfolio(id: number, file: File) {

      let formData = new FormData();
      formData.append('file', file);
    //formData.append('fileName', this.loggedInUser!.lastName);
    return this.httpClient.post<FormData>(this.url + id, formData)
  }

  deleteImage(id: number) {
    return this.httpClient.delete(this.url + id);
  }

  getDecodedImage(image: any) {
    return "data:image/png;base64," + image;
  }


}
