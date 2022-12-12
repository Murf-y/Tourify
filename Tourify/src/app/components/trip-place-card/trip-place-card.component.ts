import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';

@Component({
  selector: 'trip-place-card',
  templateUrl: './trip-place-card.component.html',
  styleUrls: ['./trip-place-card.component.scss'],
})
export class TripPlaceCardComponent implements OnInit {
  @Input() place!: Place;

  user!: User;
  constructor(private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {}

  goToPlace() {
    this.router.navigate(['/place', this.place.id]);
  }
}
