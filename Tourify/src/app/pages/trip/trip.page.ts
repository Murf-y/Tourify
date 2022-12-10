import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from 'app/models/trip';
import { User } from 'app/models/user';
import { TripCrudService } from 'app/services/tripCrud.service';

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage {
  user!: User;

  trip!: Trip;

  constructor(
    private locationStrategy: LocationStrategy,
    private tripService: TripCrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.route.params.subscribe((params) => {
      const trip_id = params['id'];
      this.tripService.getTrip(trip_id).subscribe((res) => {
        this.trip = res.data.trip;
      });
    });
  }

  goBack() {
    this.locationStrategy.back();
  }
}
