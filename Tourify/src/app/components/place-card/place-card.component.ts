import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent implements OnInit {
  @Input() place!: Place;
  @Output('toggleFav') toggleFav: EventEmitter<Place> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleFavoritePlace() {
    this.toggleFav.emit(this.place);
  }
}
