import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPageRoutingModule } from './trip-routing.module';

import { TripPage } from './trip.page';
import { TripPlaceCardComponent } from 'app/components/trip-place-card/trip-place-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TripPageRoutingModule],
  declarations: [TripPage, TripPlaceCardComponent],
})
export class TripPageModule {}
