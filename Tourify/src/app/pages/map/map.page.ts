import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Place } from 'app/models/place';
import { User } from 'app/models/user';
import { PlaceCrudService } from 'app/services/placeCrud.service';
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

  user!: User;

  places: Place[] = [];

  markerPlaceMap: Map<Marker, Place> = new Map();

  constructor(private placeService: PlaceCrudService, private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem('current_user') || '{}');

    if (!this.user || !this.user.id) {
      this.router.navigate(['login']);
    }
  }

  ionViewDidEnter() {
    this.placeService.getAll(this.user.id).subscribe((res) => {
      this.places = res.data.places;
    });
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

    this.addMarker();
  }

  async addMarker() {
    const marker: Marker[] = [
      {
        coordinate: {
          lat: 34.11538,
          lng: 35.667801,
        },
        title: 'Hello World!',
        snippet: 'This is a cool place',
      },
    ];

    this.map.setOnMarkerClickListener((marker) => {
      console.log(marker);
    });

    await this.map.addMarkers(marker);
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
