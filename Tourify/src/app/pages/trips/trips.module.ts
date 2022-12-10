import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripsPageRoutingModule } from './trips-routing.module';

import { TripsPage } from './trips.page';
import { TripCardComponent } from 'app/components/trip-card/trip-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TripsPageRoutingModule],
  declarations: [TripsPage, TripCardComponent],
})
export class TripsPageModule {}
