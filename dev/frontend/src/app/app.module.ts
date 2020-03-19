import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { SocketIoModule } from 'ngx-socket-io';

import { IncomingThreatService } from '@app/services/incoming-threat.service';
import { CoreModule } from '@core/core.module';
import { JwtInterceptor } from '@core/interceptors';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '@core/containers';
import { environment } from '@environment/environment';
import { entityConfig } from './entity-metadata';
import { HmrModule } from './hmr.module';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    SocketIoModule.forRoot({
      url: environment.incomingThreats.origin,
    }),
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, IncomingThreatService],

  bootstrap: [AppComponent],
})
export class AppModule extends HmrModule {}
