import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'fav-place-card',
  templateUrl: './fav-place-card.component.html',
  styleUrls: ['./fav-place-card.component.scss'],
})
export class FavPlaceCardComponent implements OnInit {
  @Input() place!: Place;
  @Output('toggleFav') toggleFav: EventEmitter<Place> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  toggleFavoritePlace() {
    this.toggleFav.emit(this.place);
  }
}
