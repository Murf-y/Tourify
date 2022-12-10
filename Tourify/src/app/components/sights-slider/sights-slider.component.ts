import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';

@Component({
  selector: 'sights-slider',
  templateUrl: './sights-slider.component.html',
  styleUrls: ['./sights-slider.component.scss'],
})
export class SightsSliderComponent {
  @Input() places: Place[] = [];
  @Input() slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 20,
  };

  user!: User;

  constructor(private router: Router, private placeService: PlaceCrudService) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  toggleFavoritePlace(place: Place) {
    place.isFavorited = !place.isFavorited;
    this.placeService
      .toggleFavorite(place.id, this.user.id, place.isFavorited)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
