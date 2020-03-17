import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListHeroesPageComponent, NewHeroPageComponent, UpdateHeroPageComponent } from '@dashboard/heroes/containers';

const routes: Routes = [
  {
    path: '',
    component: ListHeroesPageComponent,
  },
  {
    path: 'new',
    component: NewHeroPageComponent,
  },
  {
    path: 'update/:id',
    component: UpdateHeroPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
