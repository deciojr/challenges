import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListThreatsPageComponent } from '@dashboard/threats/containers';

const routes: Routes = [
  {
    path: '',
    component: ListThreatsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreatsRoutingModule {}
