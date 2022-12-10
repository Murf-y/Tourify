import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { VertPlaceCardComponentModule } from 'app/components/vert-place-card/vert-place-card.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    VertPlaceCardComponentModule,
  ],
  declarations: [FavoritePage],
})
export class FavoritePageModule {}
