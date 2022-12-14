import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild('map')
  mapRef!: ElementRef;

  map!: GoogleMap;

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'cool-id',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 34.11538,
          lng: 35.667801,
        },
        zoom: 8,
      },
    });
  }
  // onMapReady(map: google.maps.Map) {
  //   const marker = new google.maps.Marker({
  //     position: mapOptions.center,
  //     map,
  //     title: 'Hello World!',
  //   });
  // }

  // onMapClick(event: google.maps.MouseEvent) {
  //   console.log(event.latLng.toJSON());
  // }
}
