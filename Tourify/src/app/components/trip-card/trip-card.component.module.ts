import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TripCardComponent } from './trip-card.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [TripCardComponent],
  exports: [TripCardComponent],
})
export class TripCardComponentModule {}
