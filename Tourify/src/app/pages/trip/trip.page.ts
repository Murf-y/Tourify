import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
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
    id: '0',
    name: '',
    start_date: '',
    end_date: '',
    places: [],
    added_at: '',
  };

  trip_id!: number;

  emptyPlaces: boolean = true;

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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  ngOnInit(): void {
    this.tripService.getTrip(this.trip_id).subscribe((res) => {
      this.trip = res.data.trip;

      this.emptyPlaces = this.trip.places.length == 0;
    });
  }

  ionViewWillEnter() {
    this.tripService.getTrip(this.trip_id).subscribe((res) => {
      this.trip = res.data.trip;
      console.log(this.trip);

      this.emptyPlaces = this.trip.places.length == 0;
    });
  }

  goBack() {
    this.locationStrategy.back();
  }
}
