import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavPlaceCardComponent } from 'app/components/fav-place-card/fav-place-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritePageRoutingModule],
  declarations: [FavoritePage, FavPlaceCardComponent],
})
export class FavoritePageModule {}
