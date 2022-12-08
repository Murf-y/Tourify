import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SiteCardComponent } from 'app/components/site-card/site-card.component';
import { CategoryCardComponent } from 'app/components/category-card/category-card.component';
import { SightsSliderComponent } from 'app/components/sights-slider/sights-slider.component';
import { CategoriesSliderComponent } from 'app/components/categories-slider/categories-slider.component';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    SiteCardComponent,
    CategoryCardComponent,
    SightsSliderComponent,
    CategoriesSliderComponent,
  ],
})
export class HomePageModule {}
