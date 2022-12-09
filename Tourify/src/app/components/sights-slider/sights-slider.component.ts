import { Component, Input } from '@angular/core';
import { Place } from 'app/models/place';

@Component({
  selector: 'sights-slider',
  templateUrl: './sights-slider.component.html',
  styleUrls: ['./sights-slider.component.scss'],
})
export class SightsSliderComponent {
  @Input() places: Place[] = [];
  @Input() toggleFavorite: (place: Place) => void = () => {};
  @Input() slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 20,
  };
  constructor() {}
}
