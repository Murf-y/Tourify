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
export class TripPage implements OnInit {
  user!: User;

  trip: Trip = {
    id: '9',
    name: '',
    start_date: '',
    end_date: '',
    places: [],
    added_at: '',
  };

  trip_id!: number;

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

    this.route.params.subscribe((params) => {
      this.trip_id = params['id'];
    });
  }

  ngOnInit(): void {
    this.tripService.getTrip(this.trip_id).subscribe((res) => {
      this.trip = res.data.trip;
    });
  }

  ionViewWillEnter() {
    this.tripService.getTrip(this.trip_id).subscribe((res) => {
      this.trip = res.data.trip;
    });
  }

  goBack() {
    this.locationStrategy.back();
  }
}
