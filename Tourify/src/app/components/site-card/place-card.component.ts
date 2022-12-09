import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent implements OnInit {
  @Input() place!: Place;
  @Input() toggleFavorite: (place: Place) => void = () => {};

  constructor() {}

  ngOnInit() {}

  toggleFavoritePlace() {
    this.toggleFavorite(this.place);
  }
}
