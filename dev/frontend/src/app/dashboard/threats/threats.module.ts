import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreatFilterComponent, ThreatTableComponent } from '@dashboard/threats/components';
import { ListThreatsPageComponent } from '@dashboard/threats/containers';
import { SharedModule } from '@shared/shared.module';
import { ThreatsRoutingModule } from './threats-routing.module';

@NgModule({
  declarations: [ListThreatsPageComponent, ThreatFilterComponent, ThreatTableComponent],
  imports: [CommonModule, SharedModule, ThreatsRoutingModule],
})
export class ThreatsModule {}
