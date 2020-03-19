import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { entityNames } from '@app/entity-metadata';

import { EntityCollectionService, EntityServices, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { IncomingThreatService } from '@app/services/incoming-threat.service';
import { IncomingThreat } from '@shared/models/incoming-threat.model';
import { Threat } from '@shared/models/threat.model';

@Component({
  selector: 'app-list-threats-page',
  templateUrl: './list-threats-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListThreatsPageComponent implements OnInit {
  threatService: EntityCollectionService<Threat>;

  pending$: Observable<boolean>;
  threats$: Observable<Threat[]>;

  constructor(private incomingThreatsService: IncomingThreatService, private entityService: EntityServices) {
    this.threatService = this.entityService.getEntityCollectionService<Threat>(entityNames.threat);

    this.pending$ = this.threatService.loading$;
    this.threats$ = this.threatService.entities$;
  }

  watchIncomingThreats() {
    this.incomingThreatsService
      .incomingThreat()
      .pipe(
        map(
          ({ monsterName, dangerLevel, location }: IncomingThreat): Threat => ({
            monsterName,
            dangerLevel,
            lat: location[0].lat,
            lng: location[0].lng,
          }),
        ),
      )
      .subscribe(this.emitThreat);
  }

  getThreats({ query }: { query: Partial<Threat> }) {
    this.threatService.getWithQuery(query as QueryParams);
  }

  emitThreat = (threat: Threat) => {
    this.threatService.add(threat).subscribe(() => this.threatService.load());
  };

  ngOnInit(): void {
    this.watchIncomingThreats();
    this.threatService.load();
  }
}
