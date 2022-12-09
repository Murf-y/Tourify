import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CategoryCardComponent } from 'app/components/category-card/category-card.component';
import { SightsSliderComponent } from 'app/components/sights-slider/sights-slider.component';
import { CategoriesSliderComponent } from 'app/components/categories-slider/categories-slider.component';
import { placeCardComponent } from 'app/components/place-card/place-card.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    CategoryCardComponent,
    SightsSliderComponent,
    placeCardComponent,
    CategoriesSliderComponent,
  ],
})
export class HomePageModule {}
