import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoritesPlaces: Place[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  toggleFav(place: Place) {
    place.isFavorited = !place.isFavorited;
    this.favoritesPlaces = this.favoritesPlaces.filter(
      (place) => place.isFavorited
    );

    // TODO api remove favorite
  }
}
