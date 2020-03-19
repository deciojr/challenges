import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '@dashboard/core/containers';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'heroes',
        loadChildren: () => import('@dashboard/heroes/heroes.module').then(m => m.HeroesModule),
      },
      {
        path: 'threats',
        loadChildren: () => import('@dashboard/threats/threats.module').then(m => m.ThreatsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
