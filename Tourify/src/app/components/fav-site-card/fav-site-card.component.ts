import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site } from 'app/models/site';

@Component({
  selector: 'fav-site-card',
  templateUrl: './fav-site-card.component.html',
  styleUrls: ['./fav-site-card.component.scss'],
})
export class FavSiteCardComponent implements OnInit {
  @Input() site!: Site;
  @Output('toggleFav') toggleFav: EventEmitter<Site> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  toggleFavoriteSite() {
    this.toggleFav.emit(this.site);
  }
}
