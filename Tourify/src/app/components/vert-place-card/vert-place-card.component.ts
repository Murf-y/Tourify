import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from 'app/models/place';

@Component({
  selector: 'vert-place-card',
  templateUrl: './vert-place-card.component.html',
  styleUrls: ['./vert-place-card.component.scss'],
})
export class VertPlaceCardComponent implements OnInit {
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
