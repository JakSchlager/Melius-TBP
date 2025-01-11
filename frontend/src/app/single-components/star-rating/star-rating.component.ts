import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  // Die aktuelle Bewertung (kann von einem Eltern-Component übergeben werden)
  @Input() rating: number = 0;

  // Gibt die Bewertung an den Eltern-Component zurück
  @Output() eventEmitter: EventEmitter<number> = new EventEmitter<number>();

  // Maximale Anzahl an Sternen
  stars: number[] = [1, 2, 3, 4, 5];

  // Methode zum Setzen der Bewertung
  setRating(star: number) {
    this.rating = star;
    this.eventEmitter.emit(this.rating); // Gibt die Bewertung zurück
  }
}
