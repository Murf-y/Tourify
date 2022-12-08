import { Component, Input, OnInit } from '@angular/core';
import { Site } from 'app/models/site';

@Component({
  selector: 'site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
})
export class SiteCardComponent implements OnInit {
  @Input() site!: Site;

  constructor() {}

  ngOnInit() {}
}
