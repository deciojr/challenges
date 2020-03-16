import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '@shared/bootstrap/bootstrap.module';
import { ButtonWithLoaderComponent, CardComponent } from '@shared/components';

@NgModule({
  declarations: [CardComponent, ButtonWithLoaderComponent],
  imports: [CommonModule, BootstrapModule, ReactiveFormsModule],
  exports: [BootstrapModule, ReactiveFormsModule, CardComponent, ButtonWithLoaderComponent],
})
export class SharedModule {}
