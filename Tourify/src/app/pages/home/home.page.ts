import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Category } from 'app/models/category';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { CategoryCrudService } from 'app/services/categoryCrud.service';
import { PlaceCrudService } from 'app/services/placeCrud.service';

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
export class HomePage {
  user!: User;
  filter = Filter.All;

  places: Place[] = [];

  categories!: Category[];

  searchResults: Place[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryCrudService,
    private placeService: PlaceCrudService,
    private modalController: ModalController
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    // if the user is not logged in, redirect to login page
    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }

    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.data.categories;
    });

    this.placeService.getAll(this.user.id).subscribe((res) => {
      this.places = res.data.places;
    });
  }

  segmentChanged(ev: any) {
    switch (this.filter) {
      case Filter.All: {
        this.placeService.getAll(this.user.id).subscribe((res) => {
          this.places = res.data.places;
        });
        break;
      }
      case Filter.Popular: {
        this.placeService.getAllPopular(this.user.id).subscribe((res) => {
          this.places = res.data.places;
        });
        break;
      }
      case Filter.Latest: {
        this.placeService.getAllLatest(this.user.id).subscribe((res) => {
          this.places = res.data.places;
        });
        break;
      }

      default: {
        this.placeService.getAll(this.user.id).subscribe((res) => {
          this.places = res.data.places;
        });
        break;
      }
    }
  }

  goToProfile() {
    this.router.navigate(['/profile', this.user.id]);
  }

  goToPlace(place: Place) {
    this.modalController.dismiss();
    this.router.navigate(['/place', place.id]);
  }

  submitSearch(searchInput: any) {
    this.searchResults = [];
    let search = searchInput.value;
    if (!search || search.length < 3) {
      return;
    }
    this.preformSearch(search);
  }

  preformSearch(search: string) {
    this.placeService.search(search, this.user.id).subscribe((res) => {
      this.searchResults = res.data.places;
    });
  }

  onKeyUp(event: any) {
    this.searchResults = [];
    let search = event.target.value;
    if (!search || search.length < 3) {
      return;
    }
    this.preformSearch(search);
  }
}
