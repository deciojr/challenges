import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '@authentication/components';
import { LoginPageComponent } from '@authentication/containers';
import { AuthenticationService } from '@authentication/services/authentication.service';
import { SharedModule } from '@shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './effects/authentication.effects';
import { StoreModule } from '@ngrx/store';
import * as fromAuthentication from './reducers';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    EffectsModule.forFeature([AuthenticationEffects]),
    SharedModule,
    StoreModule.forFeature(fromAuthentication.authenticationFeatureKey, fromAuthentication.reducer),
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
