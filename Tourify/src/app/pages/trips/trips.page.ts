import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'app/models/trip';
import { User } from 'app/models/user';
import { TripCrudService } from 'app/services/tripCrud.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage {
  emptyTrips: boolean = true;
  trips: Trip[] = [];

  user!: User;

  constructor(private router: Router, private tripService: TripCrudService) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.tripService.getAll(this.user.id).subscribe((res) => {
      console.log(res);
      this.trips = res.data.trips;
      this.emptyTrips = this.trips.length === 0;
    });
  }

  goToCreateTrip() {
    this.router.navigate(['/create-trip']);
  }
}
