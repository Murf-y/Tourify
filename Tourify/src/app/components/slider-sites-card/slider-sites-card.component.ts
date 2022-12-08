import { Component, Input } from '@angular/core';
import { Site } from 'app/models/site';

@Component({
  selector: 'slider-sites-card',
  templateUrl: './slider-sites-card.component.html',
  styleUrls: ['./slider-sites-card.component.scss'],
})
export class SliderSitesCardComponent {
  @Input() sites: Site[] = [];
  slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 20,
  };
  constructor() {}
}
