import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Characteristic} from "../interfaces/Characteristic";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {
  httpClient: HttpClient = inject(HttpClient);
  private readonly url = "http://localhost:8080/characteristics/";

  constructor() { }

  loadAllCharacteristics() {
    return this.httpClient.get<Characteristic[]>(this.url + "get")
      .pipe(
        map(c => {
          let characteristics: Characteristic[] = [];

          for (const currCharacteristic of c) {
            characteristics.push({
              id: currCharacteristic.id,
              label: currCharacteristic.label,
              value: currCharacteristic.value,
            })
          }

          return characteristics;
        })
      )
  }
}
