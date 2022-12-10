import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category';
import { User } from 'app/models/user';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage {
  user!: User;
  category!: Category;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }

    this.route.params.subscribe((params) => {
      this.category = {
        id: params['id'],
        name: params['name'],
        image_path:
          environment.assets_path + 'categories/' + params['id'] + '.png',
      };
    });
  }

  ionViewWillEnter() {
    console.log(this.category);
  }

  goBack() {
    this.locationStrategy.back();
  }
}
