import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  // when view enter wait 5 seconds and then navigate to login page
  ngOnInit() {
    setTimeout(async () => {
      if (await this.checkIfOnboarded()) {
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['onboard']);
      }
    }, 5000);
  }

  checkIfOnboarded = async () => {
    const { value } = await Preferences.get({ key: 'onboarded' });
    return value === 'true';
  };
}
