import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'app/models/category';
import { place } from 'app/models/place';
import { User } from 'app/models/user';
import { CategoryCrudService } from 'app/services/categoryCrud.service';

const enum Filter {
  All = 'all',
  Popular = 'popular',
  Latest = 'latest',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user!: User;
  filter = Filter.All;

  places: place[] = [];

  categories!: Category[];

  constructor(
    private router: Router,
    private categoryService: CategoryCrudService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    // if the user is not logged in, redirect to login page
    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.data.categories;
    });
  }

  segmentChanged(ev: any) {
    console.log(this.filter);
  }

  // TODO use emitter to emit the event with child component
  toggleFavorite(place: place) {
    place.isFavorited = !place.isFavorited;
  }
}
