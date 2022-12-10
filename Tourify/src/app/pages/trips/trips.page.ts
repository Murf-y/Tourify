import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from 'app/models/trip';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {
  emptyTrips: boolean = true;
  trips: Trip[] = [];
  constructor(private router: Router) {}

  ngOnInit() {}

  goToCreateTrip() {
    this.router.navigate(['/create-trip']);
  }
}
