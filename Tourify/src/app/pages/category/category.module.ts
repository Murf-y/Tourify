import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { VertPlaceCardComponentModule } from 'app/components/vert-place-card/vert-place-card.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    VertPlaceCardComponentModule,
  ],
  declarations: [CategoryPage],
})
export class CategoryPageModule {}
