import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '@authentication/components';
import { LoginPageComponent } from '@authentication/containers';
import { SharedModule } from '@shared/shared.module';

import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, AuthenticationRoutingModule],
})
export class AuthenticationModule {}
