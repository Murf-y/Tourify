import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'vert-place-card',
  templateUrl: './vert-place-card.component.html',
  styleUrls: ['./vert-place-card.component.scss'],
})
export class VertPlaceCardComponent implements OnInit {
  @Input() place!: Place;
  @Output('toggleFav') toggleFav: EventEmitter<Place> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  toggleFavoritePlace() {
    this.toggleFav.emit(this.place);
  }
}
