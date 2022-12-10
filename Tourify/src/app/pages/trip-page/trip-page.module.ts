import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripPagePageRoutingModule } from './trip-page-routing.module';

import { TripPagePage } from './trip-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripPagePageRoutingModule
  ],
  declarations: [TripPagePage]
})
export class TripPagePageModule {}
