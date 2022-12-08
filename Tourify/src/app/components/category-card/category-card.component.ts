import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'app/models/category';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input()
  category!: Category;

  constructor() {}

  ngOnInit() {}
}
