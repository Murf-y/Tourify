import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../map/map.module').then((m) => m.MapPageModule),
      },
      {
        path: 'trips',
        loadChildren: () =>
          import('../trips/trips.module').then((m) => m.TripsPageModule),
      },
      {
        path: 'favorite',
        loadChildren: () =>
          import('../favorite/favorite.module').then(
            (m) => m.FavoritePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
