import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  image_path: string = 'assets/images/category_card_default_img.png';
  category_name: string = 'Nature';
  constructor() {}

  ngOnInit() {}
}
