import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // TODO create enum for filters
  filter = 'sights';
  constructor() {}

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log(this.filter);
  }
}
