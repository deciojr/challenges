import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from '@app/core/containers';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, RouterModule],
  exports: [HttpClientModule],
})
export class CoreModule {}
