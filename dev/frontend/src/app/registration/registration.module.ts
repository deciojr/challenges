import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '@app/registration/components';
import { RegisterPageComponent } from '@app/registration/containers';

import { StoreModule } from '@ngrx/store';
import { RegistrationService } from '@registration/registration.service';

import { SharedModule } from '@shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import * as fromRegistration from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { RegistrationEffects } from './effects/registration.effects';

@NgModule({
  declarations: [RegisterPageComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationRoutingModule,
    StoreModule.forFeature(fromRegistration.registrationFeatureKey, fromRegistration.reducer),
    EffectsModule.forFeature([RegistrationEffects]),
  ],
  providers: [RegistrationService],
})
export class RegistrationModule {}
