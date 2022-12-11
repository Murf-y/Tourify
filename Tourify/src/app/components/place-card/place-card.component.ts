import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'app/models/place';

@Component({
  selector: 'place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss'],
})
export class PlaceCardComponent implements OnInit {
  @Input() place!: Place;
  @Output('toggleFav') toggleFav: EventEmitter<Place> = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  toggleFavoritePlace() {
    this.toggleFav.emit(this.place);
  }

  goToPlace() {
    this.router.navigate(['place', this.place.id]);
  }
}
