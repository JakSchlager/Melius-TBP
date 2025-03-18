import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Image} from "../interfaces/image";
import {Portfolio} from "../interfaces/Portfolio";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/images/";

  constructor() { }

  uploadToPortfolio(id: number, file: File, position: string) {

      let formData = new FormData();
      formData.append('file', file);
      formData.append('position', position);
    //formData.append('fileName', this.loggedInUser!.lastName);
    return this.httpClient.post<FormData>(this.url + id, formData)
  }

  deleteImage(id: number) {
    return this.httpClient.delete(this.url + id);
  }

  getDecodedImage(image: any) {
    return "data:image/png;base64," + image;
  }

  updateImage(id: number, position: string) {
    return this.httpClient.patch<string>(this.url + "update/" + id, position);
  }

  getImagesByPortfolioId(portfolioId: number) {
    return this.httpClient.get<Image[]>(`${this.url}get/${portfolioId}`);
  }
}
