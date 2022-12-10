import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripPagePage } from './trip-page.page';

const routes: Routes = [
  {
    path: '',
    component: TripPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripPagePageRoutingModule {}
