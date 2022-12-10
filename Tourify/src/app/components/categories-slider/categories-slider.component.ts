import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}

  goToCategory(category: Category) {
    this.router.navigate(['/category', category.id, category.name]);
  }
}
