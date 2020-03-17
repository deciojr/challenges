import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewHeroPageComponent } from '@dashboard/heroes/containers';

const routes: Routes = [
  {
    path: 'new',
    component: NewHeroPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
