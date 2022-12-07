import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.page.html',
  styleUrls: ['./onboard.page.scss'],
})
export class OnboardPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  explore = async () => {
    await this.setOnBoarded();
    this.router.navigate(['/signup']);
  };

  setOnBoarded = async () => {
    await Preferences.set({
      key: 'onboarded',
      value: 'true',
    });
  };
}
