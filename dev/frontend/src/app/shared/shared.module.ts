import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '@shared/bootstrap/bootstrap.module';
import { CardComponent } from '@shared/components';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, BootstrapModule, ReactiveFormsModule],
  exports: [BootstrapModule, ReactiveFormsModule, CardComponent],
})
export class SharedModule {}
