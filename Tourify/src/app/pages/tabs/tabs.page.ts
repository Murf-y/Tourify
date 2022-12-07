import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  showHomeTab = true;
  showMapTab = false;
  showTripsTab = false;
  showFavTab = false;

  constructor() {}
  tabChanged(event: any) {
    const tabButtons = document.querySelectorAll('ion-tab-button');
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove('ion-tab-active');
    });

    const selectedTab = document.querySelector(
      `ion-tab-button[tab="${event.tab}"]`
    );
    if (selectedTab) {
      selectedTab.classList.add('ion-tab-active');
    }
    this.showHomeTab = event.tab === 'home';
    this.showMapTab = event.tab === 'map';
    this.showTripsTab = event.tab === 'trips';
    this.showFavTab = event.tab === 'favorite';
  }
}
