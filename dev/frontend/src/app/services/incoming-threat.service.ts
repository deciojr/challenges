import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

import { environment } from '@environment/environment';
import { IncomingThreat } from '@shared/models/incoming-threat.model';

@Injectable({
  providedIn: 'root',
})
export class IncomingThreatService extends Socket {
  constructor(private socket: Socket) {
    super({
      url: environment.incomingThreats.origin,
    });
  }

  incomingThreat() {
    return this.socket.fromEvent<IncomingThreat>(environment.incomingThreats.event);
  }
}
