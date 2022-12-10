import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'app/models/category';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';
import { environment } from 'environments/environment';

enum CategoryFilter {
  LATEST = 'latest',
  POPULAR = 'popular',
}

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage {
  user!: User;
  category!: Category;

  filter: CategoryFilter = CategoryFilter.LATEST;

  emptyCategoryPlaces: boolean = true;
  categoryPlaces: Place[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private placeService: PlaceCrudService
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
    this.placeService
      .getPlacesByCategory(this.user.id, this.category.id)
      .subscribe((res) => {
        this.categoryPlaces = res.data.places;
        this.emptyCategoryPlaces = this.categoryPlaces.length == 0;
      });
  }

  segmentChanged(event: any) {
    this.filter = event.detail.value;

    if (this.filter == CategoryFilter.POPULAR) {
      this.placeService
        .getPlacesByCategoryPopular(this.user.id, this.category.id)
        .subscribe((res) => {
          this.categoryPlaces = res.data.places;
          this.emptyCategoryPlaces = this.categoryPlaces.length == 0;
        });
    }

    if (this.filter == CategoryFilter.LATEST) {
      this.placeService
        .getPlacesByCategory(this.user.id, this.category.id)
        .subscribe((res) => {
          this.categoryPlaces = res.data.places;
          this.emptyCategoryPlaces = this.categoryPlaces.length == 0;
        });
    }
  }

  goBack() {
    this.locationStrategy.back();
  }

  toggleFav(place: Place) {
    place.isFavorited = !place.isFavorited;
    this.placeService
      .toggleFavorite(place.id, this.user.id, place.isFavorited)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
