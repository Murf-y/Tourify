import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  // when view enter wait 5 seconds and then navigate to login page
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 5000);
  }
}
