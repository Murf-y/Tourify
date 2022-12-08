import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
})
export class SiteCardComponent implements OnInit {
  image_path: string = 'assets/images/site.png';
  title: string = 'Site Title';
  category = 'Nature';
  location = 'Beirut, Lebanon';
  favorited = false;

  constructor() {}

  ngOnInit() {}
}
