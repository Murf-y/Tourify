import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage {
  favoritesPlaces: Place[] = [];

  emptyFavorites: boolean = true;

  user!: User;

  constructor(private router: Router, private placeService: PlaceCrudService) {
    // get user from session storage
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.placeService.getAllFavorites(this.user.id).subscribe((res) => {
      console.log(res);
      this.favoritesPlaces = res.data.places;
      this.emptyFavorites = this.favoritesPlaces.length == 0;
    });
  }

  toggleFav(place: Place) {
    place.isFavorited = !place.isFavorited;
    this.placeService
      .toggleFavorite(place.id, this.user.id, place.isFavorited)
      .subscribe((res) => {
        console.log(res);
      });
    this.favoritesPlaces = this.favoritesPlaces.filter(
      (place) => place.isFavorited
    );
    this.emptyFavorites = this.favoritesPlaces.length == 0;
  }
}
