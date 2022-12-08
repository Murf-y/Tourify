import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'app/models/category';

@Component({
  selector: 'categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.scss'],
})
export class CategoriesSliderComponent {
  @Input() categories: Category[] = [];
  @Input() slideOpts = {
    slidesPerView: 3.5,
    spaceBetween: 0,
  };
  constructor() {}
}
