import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { place } from 'app/models/place';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favoritesplaces: place[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  toggleFav(place: place) {
    place.isFavorited = !place.isFavorited;
    this.favoritesplaces = this.favoritesplaces.filter(
      (place) => place.isFavorited
    );

    // TODO api remove favorite
  }
}
