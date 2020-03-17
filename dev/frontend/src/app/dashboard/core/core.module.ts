import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavItemComponent, SidenavComponent } from '@dashboard/core/components';
import { DashboardComponent } from '@dashboard/core/containers';

@NgModule({
  declarations: [DashboardComponent, SidenavComponent, NavItemComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}
