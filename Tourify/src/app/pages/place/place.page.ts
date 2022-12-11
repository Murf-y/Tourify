import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';

enum placePageTab {
  OVERVIEW = 'overview',
  REVIEWS = 'reviews',
}

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {
  user!: User;

  place!: Place;

  place_id!: number;

  currentTab = placePageTab.OVERVIEW;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private placeService: PlaceCrudService
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }

    this.place_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.placeService.getPlace(this.user.id, this.place_id).subscribe((res) => {
      this.place = res.data.place;
    });
  }
  ionViewWillEnter() {
    this.placeService.getPlace(this.user.id, this.place_id).subscribe((res) => {
      this.place = res.data.place;
    });
  }

  toggleTab() {
    if (this.currentTab === placePageTab.OVERVIEW) {
      this.currentTab = placePageTab.REVIEWS;
    } else {
      this.currentTab = placePageTab.OVERVIEW;
    }
  }

  reportPlace() {}

  addToTrip() {}
}
