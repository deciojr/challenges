import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BootstrapModule } from '@shared/bootstrap/bootstrap.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, BootstrapModule, ReactiveFormsModule],
  exports: [BootstrapModule, ReactiveFormsModule, CardComponent],
})
export class SharedModule {}
