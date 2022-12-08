import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { FavSiteCardComponent } from 'app/components/fav-site-card/fav-site-card.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FavoritePageRoutingModule],
  declarations: [FavoritePage, FavSiteCardComponent],
})
export class FavoritePageModule {}
