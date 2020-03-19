import { Component, OnInit, ChangeDetectionStrategy, TrackByFunction, Input } from '@angular/core';

import { Threat } from '@shared/models/threat.model';

@Component({
  selector: 'app-threat-table',
  templateUrl: './threat-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreatTableComponent implements OnInit {
  @Input() pending: boolean;

  @Input() threats: Threat[];

  @Input() message: string;

  @Input() error: boolean;

  constructor() {}

  ngOnInit(): void {}

  trackThreats: TrackByFunction<Threat> = (index, threat) => threat.id;
}
