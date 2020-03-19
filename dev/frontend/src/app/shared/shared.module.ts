import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '@shared/bootstrap/bootstrap.module';
import { ButtonWithLoaderComponent, CardComponent } from '@shared/components';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [CardComponent, ButtonWithLoaderComponent, AlertComponent],
  imports: [CommonModule, BootstrapModule, ReactiveFormsModule],
  exports: [BootstrapModule, ReactiveFormsModule, CardComponent, ButtonWithLoaderComponent, AlertComponent],
})
export class SharedModule {}
