import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { VertPlaceCardComponent } from './vert-place-card.component';

@NgModule({
  imports: [CommonModule, IonicModule, RouterModule],
  declarations: [VertPlaceCardComponent],
  exports: [VertPlaceCardComponent],
})
export class VertPlaceCardComponentModule {}
