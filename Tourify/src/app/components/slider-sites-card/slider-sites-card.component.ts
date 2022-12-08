import { Component } from '@angular/core';

@Component({
  selector: 'slider-sites-card',
  templateUrl: './slider-sites-card.component.html',
  styleUrls: ['./slider-sites-card.component.scss'],
})
export class SliderSitesCardComponent {
  slideOpts = {
    slidesPerView: 1.5,
    spaceBetween: 20,
  };
  constructor() {}
}
