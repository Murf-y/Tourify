import { Component, Input } from '@angular/core';
import { Site } from 'app/models/site';

@Component({
  selector: 'sights-slider',
  templateUrl: './sights-slider.component.html',
  styleUrls: ['./sights-slider.component.scss'],
})
export class SightsSliderComponent {
  @Input() sites: Site[] = [];
  @Input() toggleFavorite: (site: Site) => void = () => {};
  @Input() slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 20,
  };
  constructor() {}
}
